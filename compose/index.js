/**
 * 
const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

div2(mul3(add1(add1(0)))) // => 3


const operate = compose(div2, mul3, add1, add1)
operate(0) // => 相当于 div2(mul3(add1(add1(0))))  3
operate(2) // => 相当于 div2(mul3(add1(add1(2))))  6

简而言之：compose 可以把类似于 f(g(h(x))) 这种写法简化成 compose(f, g, h)(x)
挑战：一两行之内实现
 */

const compose = function (...jobs) {
    return function (...args) {
        return jobs.reduceRight((res, job, idx) => ( idx == jobs.length - 1 ? (res = job.apply(this, args)) : (res = job.apply(this, [res]))), void 0);
    };
};

const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

const operate = compose(div2, mul3, add1, add1)
console.log(operate(0)) // => 相当于 div2(mul3(add1(add1(0))))
console.log(operate(2)) // => 相当于 div2(mul3(add1(add1(2))))