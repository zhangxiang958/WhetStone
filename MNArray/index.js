/**
 * initArray
 */

const initArray = function (m, n) {
    let array = [];
    array.length = m;
    let proxy = new Proxy(array, {
        get: function (target, name) {
            let idx = parseInt(name, 10);
            if (!Number.isNaN(idx) && idx < m) {
                return n;
            } else {
                return target[name];
            }
        }
    });
    return proxy;
};

const initArray = function (m, n) {
    return new Array(m).fill(n);
}

const initArray = function (m) {
    return [...Array(m).keys()];
}

initArray(10, 10);