const isArray = (arg) => {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

const flatten = (arr) => {
    if (!isArray(arr)) throw new Error('argument must be a Array');
    let result = [];
    for (let i = 0, length = arr.length; i < length; i ++) {
        if (!isArray(arr[i])) {
            result.push(arr[i]);
        } else {
            result = result.concat(flatten(arr[i]));
        }
    }
    return result;
};

var arr = [1, [2], [3, 4, [5]]];

console.log(flatten(arr)); 

module.exports = flatten;