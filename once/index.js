const once = function (func) {
    let result;
    return function () {
        if (!result) {
            result = func();
            return result;
        } else {
            return result;
        }
    }
};

function bootstrapApp() {
    console.log('this should be shown once');
    return 22;
  }
  
var initialize = once(bootstrapApp);
console.log(initialize());
console.log(initialize());

module.exports = once;