/**
 * 性能比较:s
 * https://blog.csdn.net/qq_33729889/article/details/55510648
 */

const trim = function(str) {
    if (typeof str !== 'string') {
        throw new Error('trim only accept string data.');
    }
    // let regx = /^\s+(.*\w+)\s+$/;
    // return str.replace(regx, '$1');

    let regx = /(^\s*)|(\s*$)/g;
    return str.replace(regx, '');
}

module.exports = trim;