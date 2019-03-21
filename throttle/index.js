const throttle = (func, delay = 0) => {
    let executed = void 0;
    return function(...args) {
        if (executed === void 0) {
            func.apply(this, args);
            executed = +new Date();
        } else {
            let now = +new Date();
            if (now - executed > delay) {
                func.apply(this, args);
                executed = now;
            } else {
                clearTimeout(func.timer);
                func.timer = setTimeout(() => {
                    func.apply(this, args);
                    executed = +new Date();
                }, delay);
            }
        }
    };
};

// var sayHi = function() {
//     console.log('hi');
// };

// var throttled = throttle(sayHi, 100);

// throttled();
// throttled();
// throttled();
// throttled();

// var called = 0;
// var throttled = throttle(function() {
//     called++;
// }, 10);
// throttled();
// throttled();
// throttled();
// setTimeout(() => {
//     console.log(called);
// }, 5);


// var startTime = new Date();
// var calledTimes = [];
// var throttled = throttle(function() {
//     calledTimes.push(new Date() - startTime);
// }, 10);
// throttled(); //start now
// var interval = setInterval(throttled, 1);
// setTimeout(function() {
//     clearInterval(interval);

//     console.log(calledTimes);
// }, 59);

module.exports = throttle;