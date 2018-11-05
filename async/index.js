const async = {
    sequence(...queue) {
        if (Array.isArray(queue[0])) queue = queue[0];
        for (let cb of queue) {
            if (typeof cb !== 'function') throw new Error('callback must a function.');
        }
        let index = 0;
        return (callback) => {
            function next(err, res) {
                if (err) callback(err, null);
                let func = queue[index++];
                if (func) func(next, res);
                else callback(err, res);
            }
            next(null);
        };
    },
    parallel(...queue) {
        if (Array.isArray(queue[0])) queue = queue[0];
        for (let cb of queue) {
            if (typeof cb !== 'function') throw new Error('callback must be function');
        }
        let results = [];
        let size = 0;
        return (callback) => {
            for (let index = 0, length = queue.length; index < length; index++) {
                let func = queue[index];
                func((err, res) => {
                    if (err) callback(err, null);
                    results[index] = res;
                    size ++;
                    if (size == length) callback(null, results);
                });
            }
        };
    },
    race(...queue) {
        if (Array.isArray(queue[0])) queue = queue[0];
        for (let cb of queue) {
            if (typeof cb !== 'function') throw new Error('callback must be function');
        }
        return (callback) => {
            let already = false;
            for (let func of queue) {
                func((err, res) => {
                    if (!already) {
                        callback(err, res);
                        already = true;
                    }
                });
            }
        };
    }
};

var getUser = function(userId) {
    return function(cb) {
        setTimeout(function() {
            cb(null, {userId: userId, name: 'Joe'});
        }, Math.random() * 100);
    };
};
  
var upperCaseName = function(cb, user) {
    cb(null, user.name.toUpperCase());
};
  
var userThunk = getUser(22);
  
async.sequence([userThunk, upperCaseName])(function(err, data) {
    console.log(data); // JOE
});
  
var userThunk1 = getUser(1);
var userThunk2 = getUser(2);
  
async.parallel([userThunk1, userThunk2])(function(err, users) {
    console.log(users); // [ { userId: 1, name: 'Joe' }, { userId: 2, name: 'Joe' } ]
});

var faster = function(cb) {
    setTimeout(cb.bind(null, null, "I'm faster"), 10);
}
async.race([userThunk1, faster])(function(err, winner) {
    console.log(winner); // I'm faster
l});


module.exports = async;