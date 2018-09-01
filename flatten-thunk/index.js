const flattenThunk = (starter) => {
    return (callback) => {
        starter((err, res) => {
            if (err) throw err;
            if (typeof res == 'function') flattenThunk(res)(callback);
            else callback(err, res);
        });
    };
};

var thunk1 = function(cb) {
  setTimeout(function() {
    cb(null, 'done');
  }, 1);
}
var thunk2 = function(cb) {
  setTimeout(function() {
    cb(null, thunk1);
  }, 1);
}
var thunk3 = function(cb) {
  setTimeout(function() {
    cb(null, thunk2);
  }, 1);
}

flattenThunk(thunk3)(function(err, result) {
  console.log(result); // 'done'
});


module.exports = flattenThunk;