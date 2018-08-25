

class Set {
    constructor(data) {
        this._set = [];
        this.size = 0;
        data && data.forEach((val) => { this.add(val); });
    }

    add(val) {
        if (this._set.indexOf(val) === -1) {
            this._set.push(val);
            this.size ++;
        }
    }

    delete(val) {
        let index = this._set.indexOf(val);
        if (index == -1) return false;
        this._set.splice(index, 1);
        this.size --;
        return true;
    }

    has(val) {
        return this._set.indexOf(val);
    }

    clear() {
        this._set = [];
        this.size = 0;
    }

    forEach(callback, thisArg = global) {
        for (let i = 0; i < this.size; i++) {
            // value 与 key 相同 
            callback.call(thisArg, this._set[i], this._set[i], this._set);
        }
    }
}

let set = new Set([1,'1', 2, '2', 2]);

console.log(set);
set.add(3);
console.log(set);