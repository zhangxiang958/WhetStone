const memoize = (func) => {
    let result = void 0;
    return () => {
        if (result) {
            return result;
        } else {
            return result = func();
        }
    }
};


function expensiveOperation() {
  console.log('this should be shown once');
  return 22;
}

var memoized = memoize(expensiveOperation);
console.log(memoized());
console.log(memoized());

// the console should show:
// this should be shown once
// 22
// 22

module.exports = memoize;