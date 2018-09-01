const isArray = (arg) => {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

const flatten = (arr, depth = 1) => {
    if (!isArray(arr)) throw new Error('argument must be a Array');
    let result = [];
    for (let i = 0, length = arr.length; i < length; i ++) {
        if (depth == 0) {
            result.push(arr[i]);
        } else {
            if (!isArray(arr[i])) {
                result.push(arr[i]);
            } else {
                result = result.concat(flatten(arr[i], --depth));
            }
        }
        
    }
    return result;
};

var arr = [1, [2], [3, 4, [5]]];

console.log(flatten(arr, 2)); 

module.exports = flatten;