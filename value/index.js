const value = (arg) => {
    if (typeof arg === 'function') {
        let result = arg();
        if (typeof result === 'function') return value(result);
        else return result;
    } else {
        return arg;
    }
};

var scalar = 'foo';
var fn = function() { return 'bar'; };
var fnTwice = function() {
  return fn;
};
var fnThrice = function() {
  return fnTwice;
};

var whoa = function() {
  return function() {
    return function() {
      return function() {
        return function() {
          return function() {
            return function() {
              return function() {
                return function() {
                  return 'hi';
                };
              };
            };
          };
        };
      };
    };
  };
};

console.log(value(scalar));   // should be      'foo'
console.log(value(fn));       // should be      'bar'
console.log(value(fnTwice));  // should also be 'bar'
console.log(value(fnThrice)); // should also be 'bar'

console.log(value(whoa));     // should be      'hi'

module.exports = value;