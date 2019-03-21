/**
 * quick sort
 * babel sort
 * select sort
 * heap sort
 * @param {*} arr 
 */
const selectionSort = function (array) {
    // 数组长度为 n
    for (let i = 0; i < array.length - 1; i ++) { // 一共要排 n 次
        let minIdx = i;
        // 在本次，我要找到本轮查找出最小的那个元素
        // 在第一轮就是找到所有最小的
        // 在第二轮就是找到次小的
        // ...
        for (let x = i + 1; x < array.length; x++) {
            if (array[minIdx] > array[x]) {
                minIdx = x;
            }
        }
        if (minIdx !== i) {
            [ array[i], array[minIdx] ] = [ array[minIdx], array[i] ];
        }
        // 不稳定
        console.log(array);
    }
};

let array = [ 3, 4, 2, 6, 8, 5, 1, 11, 100, 32,4 ];
// selectionSort(array);
// console.log(array);

const insertionSort = function (array) {
    for (let i = 1; i < array.length; i ++) { // 从第二位开始
        for (let j = i; j > 0; j--) { // 从后往前，一个个检验
            if (array[j - 1] > array[j]) {
                [ array[j - 1], array[j] ] = [ array[j], array[j - 1] ];
            }
        }
        // 稳定, 因为每次都是有一个元素往已经排好序的序列里面操作
        console.log('step', array);
    }
};

// insertionSort(array);
// console.log(array);

const bubbleSort = function (array) {
    for (let i = 0; i < array.length; i ++) {
        for (let j = 0; j < array.length; j++) {
            if (array[j] > array[j + 1]) {
                [array[j + 1], array[j] ] = [ array[j], array[j+1] ];
            }
        }
        console.log('step', array);
    }
};

// bubbleSort(array);
// console.log('bubble', array);
const merge = function (left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    console.log('step', result);
    return result.concat(left, right);
};

const mergeSort = function (array) {
    if (array.length <= 1) return array;
    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
};

// array = mergeSort(array);
// console.log(array);

const partition = function (arr, left, right) {
    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left, j = right;
    while (i <= j) {
        while (arr[i] < pivot) {
            i ++;
        }
        while (arr[j] > pivot) {
            j --;
        }
        if (i <= j) {
            [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
            i ++;
            j --;
        }
    }
    return i;
};

const quickSort = function (array) {
    if (array.length <= 1) return array.slice(0);
    let left = 0;
    let right = array.length - 1;
    const sort = (arr, left, right) => {
        let index = partition(arr, left, right);
        if (left < index - 1) {
            sort(arr, left, index - 1);
            console.log('left', arr);
        }
        if (index < right) {
            sort(arr, index, right);
            console.log('right', arr);
        }
    }
    let result = array.slice(0);
    sort(result, left, right);
    return result;
};

array = quickSort(array);
console.log(array);

const binarySearch = function (array, target) {
    array = quickSort(array);
    let low = 0, high = array.length - 1;
    let mid, element;
    while (low <= high) {
        mid = Math.floor( (low + high) / 2 );
        element = array[mid];
        if (element < target) {
            low = mid + 1;
        } else if (element < target) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};

let idx = binarySearch(array, 5);
console.log(idx);

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

// var sorted = sort(arr);
// console.log(sorted); // [1, 2, 3, 4, 5]

module.exports = sort;