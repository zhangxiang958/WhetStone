const trim = require('./index.js');

console.time('trim');
let str = trim('      a   bc       ');
console.timeEnd('trim');

console.log(str === 'a   bc');