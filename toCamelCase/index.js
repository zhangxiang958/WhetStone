/**
 *  可以接受一个字符串作为参数，可以把类似于 is_good 这样的变量名替换成 isGood
    变量名首尾的下划线不需要做处理，中间的下划线全部删除并且处理成驼峰
 * @param {*} str 
 */

const toCamelCase = function (str) {
    if (typeof str !== 'string') {
        throw new Error('str onlt accept string.');
    }
    let regx = /(\w)(\_)(\w)/gs;
    return str.replace(regx, (...args) => {
        let [ matched, first, underline, second ] = args;
        return `${first}${second.toUpperCase()}`;
    });
};

console.log(toCamelCase('is_good'));