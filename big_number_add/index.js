const add = function (a, b) {
    if (a.length < b.length) [a, b] = [b, a];
    let arrA = a.split('').reverse();
    let arrB = b.split('').reverse();
    let lengthDiff = arrA.length - arrB.length;
    arrB = arrB.concat([...Array(lengthDiff)].fill('0'));
    let result = [];
    for (let index of [...arrA.keys()]) {
        let itemA = arrA[index];
        let itemB = arrB[index];
        let origin = result[index];
        let sum = origin == null ? (+itemA + +itemB) : (+origin + +itemA + +itemB);
        if (sum < 10) {
            result[index] = sum;
        } else {
            result[index] = sum % 10;
            result[index + 1] = 1;
        }
    }
    // console.log(result.reverse().join(''));
    // return result.reverse().join();
    return result.reverse().join('');
};
const minus = function (a, b) {
    if (a.length < b.length) [a, b] = [b, a];
    let arrA = a.split('').reverse();
    let arrB = b.split('').reverse();
    let lengthDiff = arrA.length - arrB.length;
    arrB = arrB.concat([...Array(lengthDiff).fill('0')]);
    let result = [];
    for (let index of [...arrA.keys()]) {
        let itemA = +arrA[index];
        let itemB = +arrB[index];
        if (result[index] == undefined) {
            let diff = itemA - itemB;
            if (diff >= 0) {
                result[index] = diff;
            } else {
                result[index] = diff + 10;
                result[index + 1] = -1;
            }
        } else {
            let diff = itemA - itemB + result[index];
            if (diff >= 0) {
                result[index] = diff;
            } else {
                result[index] = diff + 10;
                result[index + 1] = -1;
            }
        }
    }
    return result.reverse().join('');
};
function bigNumberAdd (a, b) {
    let symbolA = /^(-)\d+/.exec(a);
    let symbolB = /^(-)\d+/.exec(b);
    if ( (symbolA && symbolB) || (symbolA === null && symbolB === null) ) {
        let symbol = symbolA ? '-' : '';
        return `${symbol}${ symbol ? add(a.slice(1), b.slice(1)): add(a, b) }`;
    } else {
        let aWithoutSymbol = symbolA ? a.slice(1) : a;
        let bWithoutSymbol = symbolB ? b.slice(1) : b;
        if (aWithoutSymbol.length > bWithoutSymbol.length) {
            return `${ symbolA ? '-': '' }${minus(aWithoutSymbol, bWithoutSymbol)}`;
        } else {
            return `${ symbolB ? '-': '' }${minus(bWithoutSymbol, aWithoutSymbol)}`;
        }
    }
}

let result1 = bigNumberAdd(
    '23909080089709873508234',
    '9834309800089325675433678'
    );
    // 9858218880179035548941912

let result2 = bigNumberAdd(
    '23909080089709873508234',
    '-9834309800089325675433678'
    );

let result3 = bigNumberAdd(
    '-23909080089709873508234',
    '-9834309800089325675433678'
    );

let result4 = bigNumberAdd(
    '-23909080089709873508234',
    '9834309800089325675433678'
    );

console.log('正正', result1);
console.log('正负', result2);
console.log('负负', result3);
console.log('负正', result4);
// console.log(result2.length - 1);

let test = bigNumberAdd('843529812342341234', '236124361425345435');
console.log(test === "1079654173767686669");

module.exports = bigNumberAdd;