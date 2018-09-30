for (let i = 0; i < 10; i ++) {
    let x = i;
}

for(var i = 0; i < 10; i++) {
    (function(i){
        var x = i;
    })(i);
}

let callback = [];
for(let i = 0; i < 10; i++) {
    callback[i] = i;
}

var callback = [];
for(var i = 0; i < 10; i++) {
    (function(i){
        callback[i] = i;
    })(i);
}