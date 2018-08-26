

const NaNSymbol = Symbol('NaN');

class Set {
    constructor(data) {
        this._set = [];
        this.size = 0;
        data && data.forEach((val) => { this.add(val); });
    }

    static decodeVal(val) {
        return val === NaNSymbol ? NaN : val;
    }

    static encodeVal(val) {
        return val === val ? val : NaNSymbol;
    }

    static makeIterator(array, iterator) {
        let nextIndex = 0;

        let obj = {
            next() {
                if (nextIndex < array.length) {
                    return {
                        value: iterator(array[nextIndex++]),
                        done: false
                    }
                } else {
                    return {
                        value: void 0,
                        done: true
                    }
                }
            }
        }

        obj[Symbol.iterator] = function (){
            return obj;
        }

        return obj;
    }

    static forOf(arr, cb) {
        let iterator, result;

        if (typeof arr[Symbol.iterator] !== 'function') throw new Error(`${arr} is not a iterator`);
        if (typeof cb !== 'function') throw new Error('callback is not a function');

        iterator = arr[Symbol.iterator]();

        result = iterator.next();
        while(!result.done) {
            cb(result.value);
            result = iterator.next();
        }
    }

    add(val) {
        val = Set.encodeVal(val);
        if (this._set.indexOf(val) === -1) {
            this._set.push(val);
            this.size ++;
        }
    }

    delete(val) {
        let index = this._set.indexOf(Set.encodeVal(val));
        if (index == -1) return false;
        this._set.splice(index, 1);
        this.size --;
        return true;
    }

    has(val) {
        return this._set.indexOf(Set.encodeVal(val));
    }

    clear() {
        this._set = [];
        this.size = 0;
    }

    forEach(callback, thisArg = global) {
        // for (let i = 0; i < this.size; i++) {
        //     // value 与 key 相同
        //     let val = Set.decodeVal(this._set[i]);
        //     // 这里的两个参数相同是因为 ES6 规范者为了盒数组与 Map 保持一致
        //     // 将 set 中键与值视同
        //     callback.call(thisArg, val, val, this._set);
        // }
        let iterator = this.entries();

        Set.forOf(iterator, (val) => {
            callback.call(thisArg, val[0], val[1], this._set);
        });
    }

    keys() {
        return Set.makeIterator(this._set, val => Set.decodeVal(val));
    }

    values() {
        return Set.makeIterator(this._set, val => Set.decodeVal(val));
    }

    entries() {
        return Set.makeIterator(this._set, val => { val = Set.decodeVal(val); return [val, val] });
    }

    [Symbol.iterator]() {
        return this.values();
    }
}

let set = new Set([1,'1', 2, '2', 2]);

console.log(set);
set.add(3);
console.log(set);
set.add(NaN);
console.log(set);
set.add(NaN);
console.log(set);
set.forEach((val, key) => {
    console.log(val, key);
});

for (let v of set) {
    console.log(v);
}