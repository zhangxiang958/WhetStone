const curry = (func) => {
    return () => {
        
    }
};

function add(a, b) {
    return a + b;
}
  
var curried = curry(add);
console.log(  curried(1)(2)  ); // 3

module.exports = curry;