let uid = 0;

class Dep {
    constructor () {
        this.id = uid++; // id
        this.subs = [];
    }

    depend () {
        // this.addDep(Dep.target);
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify () {
        this.subs.forEach(sub => {
            sub.update();
        });
    }

    addSub (target) {
        // if (!this.subs.includes(target)) {
        //     this.subs.push(target);
        // }
        this.subs.push(target);
    }

    removeSub (target) {
        let idx = this.subs.findIndex(target);
        if (~idx) {
            this.subs.splice(idx, 1);
        }
    }
}

Dep.target = null;

const arrayPrototype = Array.prototype;
const hijackArray = Object.create(arrayPrototype);
const hasProto = '__proto__' in {};

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
    const origin = arrayPrototype[method];

    Object.defineProperty(hijackArray, method, {
        writable: true,
        configurable: true,
        enumerable: false,
        value (...args) {
            const ob = this.__ob__;
            let inserted;
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }
            let result = origin.apply(this, args);
            if (inserted) Observer.observeArray(inserted);
            ob.dep.notify();
            return result;
        }
    });
});

const protoAugment = (target, src, keys) => {
    target.__proto__ = src;
}

const copyAugment = (target, src, keys) => {
    for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        Object.defineProperty(target, key, {
            writable: true,
            configurable: true,
            enumerable: false,
            value: src[key]
        });
    }
}

class Observer {
    constructor (data) {
        this.data = data;

        this.dep = new Dep();
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false,
            writable: false,
            configurable: false
        });

        if (!Array.isArray(data)) {
            this.walk(data);
        } else {
            if (hasProto) {
                protoAugment(data, hijackArray);
            } else {
                copyAugment(data, hijackArray, hijackArray.hasOwnPropertyNames());
            }
            Observer.observeArray(data);
        }
    }

    static observe (value, asRootData) {
        if (typeof value !== 'object') {
            return;
        }
        let ob;
        if (value.hasOwnProperty('__ob__') && value['__ob__'] instanceof Observer) {
            ob = value['__ob__'];
        } else {
            ob = new Observer(value);
        }
        return ob;
    }

    static observeArray (value) {
        value.forEach(item => {
            Observer.observe(item);
        });
    }

    walk (data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }

    defineReactive (data, key, val) {
        let ob = Observer.observe(val);
        let dep = new Dep();

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get () {
                if (Dep.target) dep.depend();
                if (Dep.target && Array.isArray(val) && ob) ob.dep.depend();
                return val;
            },
            set (newVal) {
                if (newVal === val) return;
                console.log('changed val', val, '=>', newVal);
                val = newVal;
                dep.notify();
            }
        });
    }
}
// let data = {
//     test: '123',
//     name: 'shawn',
//     child: {
//         name: 'child',
//         son: {
//             age: 18,
//             hobbit: [{
//                 name: 'ball'
//             }, {
//                 name: 'code'
//             }]
//         }
//     },
//     list: [1,2,3]
// };
// data.loop = data;
// let vm = new Observer(data);

// class VM {
//     constructor () {
//         Object.keys(vm.data).forEach(key => {
//             this._proxyData.call(vm, key);
//         });
//     }

//     _proxyData (key, setter, getter) {
//         let self = this;
//         setter = setter || Object.defineProperty(self, key, {
//             enumerable: true,
//             configurable: false,
//             get () {
//                 return self.data[key];
//             },
//             set (newVal) {
//                 self.data[key] = newVal;
//             }
//         });
//     }
// }

// new VM();

// new Watcher(vm, 'test', (value) => {
//     console.log('test newValue is', value);
// });

// new Watcher(vm, 'child.name', (value) => {
//     console.log('child.name newValue is', value);
// });

// new Watcher(vm, 'child.son.age', (value) => {
//     console.log('child.son.age newValue is', value);
// });

// new Watcher(vm, 'list', (value) => {
//     console.log('list newValue is', value);
// });

// // vm.data.test = 123;
// // vm.data.child.name = 'test child';
// // vm.data.child.son.age = 19;
// data.test = 123;
// data.child.name = 'test child';
// data.child.son.age = 19;
// data.list.push(4);
// data.list.splice(3, 1, 5);