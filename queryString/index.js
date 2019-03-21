/**
 * 输入 'http://www.google.com/?foo=1&bar=3'
 * return { foo: 1, bar: 3 }
 * 特殊情况说明：如果出现 ?name=&age=12 则返回 { name: '', age: '12' }，如果 ?name&age=12 则返回 { name: null, age: '12' }
 * 请考虑清楚 query string 可能出现的各种情况，包括可能的出现 hash 的情况（?name=jerry#nice）
 * 如果需要帮助，可以对照参 URI.js 的执行结果。
 * @param {*} url 
 */

const queryString = function (url) {
    let [address, query] = url.split('?');
    if (!query) return {};
    query = query.replace(/\#.*/, '');
    query.match(/\?[^#]+/);
    if (!query) return {};
    query = query[0].substr(1).split('&');
    let queryMap = query.split('&');
    let result = {};
    let existKeys = [];
    for (let group of queryMap) {
        let [key,value] = group.split('=');
        if (!value) value = group.includes('=') ? '' : null;
        if (!existKeys.includes(key)) {
            result[key] = value;
            existKeys.push(key);
        } else {
            if (Array.isArray(result[key])) {
                result[key].push(value);
            } else {
                let temp = result[key];
                result[key] = [temp, value];
            }
        }
    }
    return result;
};

console.log(queryString('http://www.google.com/?foo=1&foo=123&foo=test&bar=3&name&name=&test=&test=i#index'));