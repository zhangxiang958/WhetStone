const curry = (func) => {
    let allArgs = [];
    return function callback (...args) {
        allArgs = allArgs.concat(args);
        if (allArgs.length < func.length) {
            return callback;
        } else {
            return func.apply(null, allArgs);
        }
    }
};

function add(a, b) {
    return a + b;
}
  
var curried = curry(add);
console.log(  curried(1)(2)  ); // 3

module.exports = curry;