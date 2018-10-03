/**
 * quick sort
 * babel sort
 * select sort
 * heap sort
 * @param {*} arr 
 */

const sort = (arr, type = 'quickSort') => {
    if (!Array.isArray(arr)) throw new Error('sort arguments must be a array.');
    for (let index = 0, length = arr.length; index < length; index++) {
        let item = arr[index];
        for (let j = index + 1, length = arr.length; j < length; j++) {
            let compareItem = arr[j];
            if (item > compareItem) {
                arr[j] = item;
                arr[index] = compareItem;
                break;
            }
        }
    }
    return arr;
};

var arr = [5, 1, 4, 2, 3];

var sorted = sort(arr);
console.log(sorted); // [1, 2, 3, 4, 5]

module.exports = sort;