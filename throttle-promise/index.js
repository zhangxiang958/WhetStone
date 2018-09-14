const throttlePromises = (concurrency, ...queue) => {
    if (Array.isArray(queue[0])) queue = queue[0];
    let results = [];
    let size = queue.length;
    let index = 0;
    let running = 0;

    return new Promise((resolve, reject) => {
        const next = () => {
            if (running < concurrency) {
                let funcIndex = index++;
                let func = queue[funcIndex];
                if (!func) {
                    if (results.filter(i => i !== undefined).length == size) resolve(results);
                    return;
                }
                running ++;
                func().then((res) => {
                    results[funcIndex] = res;
                    running --;
                    next();
                }).catch((err) => {
                    reject(err);
                });
            }
        };

        for (let start = 0; start < concurrency; start ++) {
            next();
        }
    });
};

var nextValue = 0;
var asyncFactory = function() {
    var resolveWith = nextValue++;
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(resolveWith + '!');
        }, Math.random() * 100);
    });
};

var arr = [];
for (var i = 0; i < 100; i++) {
    arr.push(asyncFactory); // push the factory but don't instantiated since that would start it now
}

// this is the solution function you'll write
throttlePromises(5, arr).then(function(results) {
    console.log(results);
    console.log('only 5 promises were ever executing in parallel');
});