let Watcher = (function(){
    let signalHandlers = {}, _data;
    let Dep = { 
        target: null,
        // 存储计算属性的依赖
        subs: {},
        // 在计算属性和其他计算后
        depend (deps, dep) {
            // 双向依赖
            if (!deps.includes(this.target)) {
                deps.push(this.target);
            }
            if (!Dep.subs[this.target].includes(dep)) {
                Dep.subs[this.target].push(dep);
            }
        },
        getValidDeps (deps, key) {
            return deps.filter(dep => this.subs[dep].includes(key));
        },
        notifyDeps (deps) {
            deps.forEach(notify)
        }
    };

    function notify (signal, newVal) {
        if (!signalHandlers[signal] || signalHandlers[signal].length === 0) return;
        signalHandlers[signal].forEach((handler) => handler(newVal));
    }

    function observe (property, handler) {
        if (!signalHandlers[property]) signalHandlers[property] = [];

        signalHandlers[property].push(handler);
    }

    function beReactive (obj, key) {
        let val = obj[key];
        let deps = [];
        Object.defineProperty(obj, key, {
            get() {
                if (Dep.target) {
                    Dep.depend(deps, key);
                }
                return val;
            },
            set(newVal) {
                val = newVal;
                deps = Dep.getValidDeps(deps, key);
                Dep.notifyDeps(deps, key);
                notify(key, newVal);
            }
        });
    }

    function beComputed (obj, key, computedFunc) {
        let cache = null;
        let deps = [];

        observe(key, () => {
            cache = null;

            deps = Dep.getValidDeps(deps, key);
            Dep.notifyDeps(deps, key);
        });

        Object.defineProperty(obj, key, {
            get () {
                if (Dep.target) {
                    Dep.depend(deps, key);
                }
                Dep.target = key;
                if (!cache) {
                    Dep.subs[key] = [];
                    cache = computedFunc.call(obj);
                }
                Dep.target = null;
                return cache;
            },
            set () {
                // 不让重置计算属性
            }
        });
    }
    
    function observeData (data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'function') {
                    beComputed(data, key, data[key]);
                } else {
                    beReactive(data, key);
                }
            }
        }
    }

    function mount (root) {
        const nodes = root.querySelectorAll('[w-text]');
        for(let node of nodes) {
            let property = node.attributes['w-text'].value;
            node.textContent = _data[property];
            observe(property, () => {
                node.textContent = _data[property];
            });
        }
    }

    return function (data) {
        observeData(data);
        _data = data;
        return {
            data, observe, notify, mount
        };
    };
})();

function updateText (property, event) {
    App.data[property] = event.target.value;
}

function resetTitle () {
    App.data.title = 'hahah';
}

// function subscribeWatchers(watchers, context) {
//     for (let key in watchers) {
//         if (watchers.hasOwnProperty(key)) {
//             // We use Function.prototype.bind to bind our data model
//             // as the new `this` context for our signal handler
//             observe(key, watchers[key].bind(context))
//         }
//     }
// }

// subscribeWatchers(config.watch, config.data);
// 上面这个代码可以提供库的 data 和 watch 分开的能力，也就是说可以写
// 同名的数据和计算属性

let data = {
    firstName: 'zhang',
    lastName: 'xiang',
    age: 25,
    area: 'china',
    title: 'hahah',
    computedName() {
        switch (this.area) {
            case 'china':
                return `your chinese first is ${this.firstName}`
            case 'en':
                return `your en first is ${this.lastName}`;
            default:
                return 'none';
        }
    },
    computedNameLength() {
        return this.computedName.length
    }
};

const App = Watcher(data);
App.mount(document.body);

App.observe('firstName', () => console.log(App.data.firstName));
App.observe('lastName', () => console.log(App.data.lastName));

data.firstName = 'fuck';