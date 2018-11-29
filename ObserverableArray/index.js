/**
 * 在前端的 MVVM 框架当中，我们经常需要监听数据的变化，而数组是需要监听的重要对象。
 * 请你完成 ObserverableArray，它的实例和普通的数组实例功能相同，但是当调用：
 * push
 * pop
 * shift
 * unshift
 * splice
 * sort
 * reverse
 * 这些方法的时候，除了执行相同的操作，还会把方法名打印出来。 例如：
 * const arr = new ObserverableArray()
 * arr.push('Good') // => 打印 'push'，a 变成了 ['Good']
 * 注意，你不能修改 Array 的 prototype。还有函数 return 的值和原生的操作保持一致。
 */

class ObserverableArray extends Array {
    constructor (...args) {
        super(...args);
    }

    callOperation(method, args) {
        let result = super[method].apply(this, args);
        console.log(`${method}, 数据变成了 `, this);
        return result;
    }

    push(...args) {
        return this.callOperation('push', args);
    }

    pop(...args) {
        return this.callOperation('pop', args);
    }

    shift(...args) {
        return this.callOperation('shift', args);
    }

    unshift(...args) {
        return this.callOperation('unshift', args);
    }

    splice(...args) {
        return this.callOperation('splice', args);
    }

    sort(...args) {
        return this.callOperation('sort', args);
    }

    reverse() {
        return this.callOperation('reverse', args);
    }
}

const arr = new ObserverableArray();
arr.push('Good'); // ['Good']
console.log(arr);