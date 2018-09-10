const throttle = (func, delay = 0) => {
    let excuted = +new Date();
    return () => {
        let now = +new Date();
        if (now - excuted >= delay) {
            func();
            excuted = +new Date();
        }
    };
};

var sayHi = function() {
    console.log('hi');
};

var throttled = throttle(sayHi, 100);

throttled();
throttled();
throttled();
throttled();

module.exports = throttle;