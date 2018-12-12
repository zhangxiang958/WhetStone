/**
 * 在 React、Redux 当中，经常会用到一种 shallowEqual 来做性能优化。
 * shallowEqual 结合 immutable 的共享数据结构可以帮助我们简单地检测到哪些数据没有发生变化，
 * 就不需要做额外的渲染等操作，优化效果拨群。
 * 简单来说，shallowEqual 接受两个参数，如果这两个参数的值相同、或者这两个参数都是对象并且对象的第一层数据相同，
 * 那么就返回 true；否则就返回 false。例如：
 * shallowEqual(1, 1) // true
 * shallowEqual(1, 2) // false
 * shallowEqual('foo', 'foo') // true
 * shallowEqual(window, window) // true
 * shallowEqual('foo', 'bar') // false
 * shallowEqual([], []) // true
 * shallowEqual([1, 2, 3], [1, 2, 3]) // true
 * shallowEqual({ name: 'Jerry' }, { name: 'Jerry' }) // true
 * shallowEqual({ age: NaN }, { age: NaN }) // true
 * shallowEqual(null, { age: NaN }) // false
 * 
 * var a = { name: 'Jerry' }
 * var b = { age: 12 }
 * shallowEqual({ a, b }, { a, b }) // true
 * shallowEqual({ name: { a, b } }, { name: { a, b } } // false
 * shallowEqual({ a, b }, { a }) // false
 */

const shallowEqual = function (params, otherParams) {
    if (typeof params !== typeof otherParams) {
        return false;
    } else if (Array.isArray(params) && Array.isArray(otherParams)) {
        if (params.length !== otherParams.length) return false;
        return params.every((i, idx) => {
            return i === otherParams[idx];
        });
    } else if (typeof params == 'object' && typeof otherParams == 'object') {
        if ((params == null || otherParams == null)) return false;
        if (Object.keys(params).length !== Object.keys(otherParams).length) return false;
        let keys = Object.keys(params);
        let res = true;
        for (let i = 0, length = keys.length; i < length; i++) {
            let prop = keys[i];
            if (params[prop] !== otherParams[prop]) {
                res = false;
                break;
            }
        }
        return res;
    } else {
        if (Number.isNaN(params) && Number.isNaN(otherParams)) return true;
        return params === otherParams;
    }
};

console.log('1,1',shallowEqual(1, 1)) // true
console.log('1,2',shallowEqual(1, 2)) // false
console.log('foo,foo',shallowEqual('foo', 'foo')) // true
// shallowEqual(window, window) // true
console.log('foo,bar',shallowEqual('foo', 'bar')) // false
console.log('[],[]',shallowEqual([], [])) // true
console.log('[1,2,3],[1,2,3]',shallowEqual([1, 2, 3], [1, 2, 3])) // true
console.log('{name:jerry},{name:jerry}',shallowEqual({ name: 'Jerry' }, { name: 'Jerry' })) // true
console.log('{age:NaN},{age:NaN}',shallowEqual({ age: NaN }, { age: NaN })) // true
console.log('null, {age:NaN}',shallowEqual(null, { age: NaN })) // false

var a = { name: 'Jerry' }
var b = { age: 12 }
console.log('{a,b},{a,b}',shallowEqual({ a, b }, { a, b })) // true
console.log('{name:{a,b}}, {name:{a,b}}',shallowEqual({ name: { a, b } }, { name: { a, b } }));// false
console.log('{a,b},{a}',shallowEqual({ a, b }, { a })) // false