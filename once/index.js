const once = function (func) {
    let result;
    let already = false;
    return function () {
        let args = [].slice.call(arguments, 0);
        if (!already) {
            already = true;
            result = func.apply(this, args);
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
var args;
    var init = once(function() {
      args = [].slice.call(arguments);
    });
    init(11, 22, 33);
    init(22, 33, 44);
console.log(args);
module.exports = once;