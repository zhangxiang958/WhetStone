window.target = null;
let id = 0;

class Dep {
    constructor () {
        this.id = id++;
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    depend () {
        window.target.addDepend(this);
    }

    notify () {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}

function beReactive (data, key, val) {
    let dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get () {
            if (window.target) dep.depend();
            return val;
        },
        set (newVal) {
            if (newVal === val) return;
            console.log('val changed:', val, '=>', newVal);
            val = newVal;
            dep.notify();
        }
    });
}

function Observe (context) {
    if (!context._data || typeof context._data !== 'object') return;

    Object.keys(context._data).forEach(key => {
        beReactive(context._data, key, context._data[key]);
    });
}

class Compiler {
    constructor (el, vm) {
        this.$vm = vm;
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);

        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el);
            this.init();
            this.$el.appendChild(this.$fragment);
        }
    }

    init () {
        this.compileElement(this.$fragment);
    }

    compileElement (el) {
        let childNodes = el.childNodes;
        
        [].slice.call(childNodes).forEach(node => {
            let text = node.textContent;
            let regex = /\{\{(.*)\}\}/;
            if (this.isElementNode(node)) {
                this.compile(node);
            } else if (this.isTextNode(node) && regex.test(text)) {
                this.compileText(node, RegExp.$1.trim());
            }

            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        });
    }

    compile (node) {
        let nodeAttrs = node.attributes;

        [].slice.call(nodeAttrs).forEach(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);
                if (this.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, this.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, this.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    }

    compileText (node, exp) {
        compileUtil.text(node, this.$vm, exp);
    }

    node2Fragment (el) {
        let fragment = document.createDocumentFragment();
        let child;
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
        // appendChild 的功能是剪切，也就是说，如果你把某个节点 appendChild 到某个其他位置
        // 那么这个节点是会被原来的位置移除，然后插入到新的位置，如果你要保留原来的位置
        // 那么就是需要 cloneNode
        // 举个例子：如果 el 有 ABCDE 有 5 个元素，如果你不断地 appendChild(firstChild)
        // 那么最后 el 就会没有子元素了. firstChild 为 null
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    }

    isEventDirective (dir) {
        return !!~dir.indexOf('on');
    }

    isDirective (attr) {
        return !!~attr.indexOf('v-');
    }

    isElementNode (node) {
        return node && node.nodeType === 1;
    }

    isTextNode (node) {
        return node && node.nodeType === 3;
    }
}

const compileUtil = {
    text (node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model (node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        let me = this, value = this._getVmValue(vm, exp);
        node.addEventListener('input', function (e) {
            let newValue = e.target.value;
            if (val === newVal) return;

            me._setVmValue(vm, exp, newValue);
            val = newValue;
        });
    },

    bind(node, vm, exp, dir) {
        let updateFn = updater[`${dir}Updater`];

        updateFn && updateFn(node, this._getVmValue(vm, exp));

        new Watcher(vm, exp, function (value, oldValue) {
            updateFn && updateFn(node, value, oldValue);
        });
    },

    eventHandler () {

    },

    _getVmValue (vm, exp) {
        let val = vm;
        exp = exp.split('.');
        exp.forEach((k) => {
            val = val[k];
        });

        return val;
    },

    _setVmValue (vm, exp, value) {
        let val = vm;
        exp = exp.split('.');
        exp.forEach((k, i) => {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

const updater = {
    textUpdater (node, value) {
        node.textContent = value === void 0 ? '' : value;
    },

    htmlUpdater () {
        
    },

    classUpdater () {

    },

    modelUpdater (node, value) {
        node.value = value === void 0 ? '' : value;
    }
};

class Watcher {
    constructor (vm, expOrFn, cb) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.depIds = {};

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = this.parseGetter(expOrFn.trim());
        }

        this.value = this.get();
    }
    
    update () {
        let value = this.get();
        let oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }

    get () {
        window.target = this;
        let value = this.getter.call(this.vm, this.vm);
        window.target = null;
        return value;
    }

    parseGetter (exp) {
        if (/[^\w.$]/.test(exp)) return;

        let exps = exp.split('.');

        return function (obj) {
            for (let i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }

    addDepend (dep) {
        if (this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
}

class Xue {
    constructor (options) {
        this._options = options;
        this._data = options.data || {};

        Observe(this);
        Object.keys(this._data).forEach(key => {
            this._proxyData(key);
        });

        this.$compiler = new Compiler(options.el || document.body, this);
    }

    _proxyData (key, setter, getter) {
        let self = this;
        setter = setter || Object.defineProperty(this, key, {
            enumerable: true,
            configurable: false,
            get () {
                return self._data[key];
            },
            set (newVal) {
                self._data[key] = newVal;
            }
        });
    }
}