const throttle = (func, delay = 0) => {
    let excuted = void 0;
    return () => {
        if (!excuted) {
            setTimeout(func, 0);
            excuted = +new Date();
        } else {
            if (+new Date() - excuted > delay) {
                setTimeout(func, 0);
            } else {
                clearTimeout(func.timer);
                func.timer = setTimeout(func, 0);
                excuted = +new Date();
            }
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