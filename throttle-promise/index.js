const throttlePromises = (concurrency, ...queue) => {
    if (Array.isArray(queue[0])) queue = queue[0];
    let results = [];
    let start = 0;
    let size = queue.length;

    const next = () => {
      return new Promise((resolve, reject) => {
          if (start == size) {
            resolve(results);
            return;
          }
          let concurrencyPromises = [];
          for (let func of queue.slice(queue.slice(start, start + concurrency))) {
            concurrencyPromises.push(func());
          }

          concurrencyPromises.then((concurrencyResult) => {
            results = results.concat(concurrencyResult);
            start += concurrency;
            next();
          });
      });
    };

    return new Promise((resolve, reject) => {
        let concurrencyPromises = [];
          for (let func of queue.slice(queue.slice(starter, starter + concurrency))) {
            concurrencyPromises.push(func());
          }
          Promise.all(concurrencyPromises).then((concurrencyResult) => {
            results = results.concat(concurrencyResult);
            start += concurrency;
            next(start);
          });
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