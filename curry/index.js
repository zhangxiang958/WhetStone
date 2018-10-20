// const curry = (func) => {
//     let allArgs = [];
//     return function callback (...args) {
//         allArgs = allArgs.concat(args);
//         let applyArgs = [];
//         if (allArgs.length < func.length) {
//             return curry(callback);
//         } else {
//             applyArgs = allArgs;
//             allArgs = [];
//             return func.apply(null, applyArgs);
//         }
//     }
// };

const curry = (func) => {
    let argLength = func.argLength || func.length;
    func.args = func.args || [];
    return function callback (...args) {
        let thisArgs = func.args.concat(args);
        if (thisArgs.length < argLength) {
            callback.args = thisArgs;
            callback.argLength = argLength;
            callback.origin = func.origin || func;
            return curry(callback);
        } else {
            return func.origin ? func.origin.apply(null, thisArgs) : func.apply(null, thisArgs);
        }
    }
}

function add(a, b) {
    return a + b;
}
  
var curried = curry(add);
console.log(  curried(1)(2)  ); // 3
var add = curry(function(a, b, c, d) {
    return a + b + c + d;
});
var firstTwo = add(1)(2);
console.log(firstTwo(3)(4)); // 10
var firstThree = firstTwo(5);
console.log(firstThree(6)); // 14
module.exports = curry;