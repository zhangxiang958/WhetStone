const map = (arr, func) => {
    if (Object.prototype.toString.call(arr) !== '[object Array]') throw new Error('arr must be a Array');
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        result[i] = func.call(null, arr[i], i, arr);
    }
    return result;
};

var numbers = [1, 2, 3];

var doubles = map(numbers, function(number) {
  return number * 2;
});

console.log(doubles); // [2, 4, 6]


module.exports = map;