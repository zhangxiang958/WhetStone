const throttle = (func, delay = 0) => {
    let excuted = void 0;
    let timer = void 0;
    return () => {
        let now = +new Date();
        if (!timer) {
            timer = setTimeout(func, 0);
            excuted = now;
        } else {
            if (now - excuted >= delay) {
                timer = setTimeout(func, 0);
                excuted = now;
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