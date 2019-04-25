class Watcher {
    constructor (vm, expOrFn, cb, opts) {
        this.vm = vm;
        this.deps = [];
        this.depIds = new Set();
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.opts = opts;

        if (typeof this.expOrFn === 'function') {
            this.getter = this.expOrFn;
        } else {
            this.getter = this.parsePath(this.expOrFn);
        }

        this.value = this.get();
        if (Array.isArray(this.value)) this.value = JSON.stringify(this.value);
    }

    get () {
        Dep.target = this;
        let value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    }

    update () {
        let value = this.get();
        let oldValue = this.value;
        if (typeof value == typeof oldValue) {
            if (Array.isArray(value)) {
                value = JSON.stringify(value);
                if (value !== oldValue) {
                    this.value = value;
                    this.cb.call(this.vm, JSON.parse(value), oldValue);
                }
                return;
            } else if (value !== oldValue) {
                this.value = value;
                this.cb.call(this.vm, value, oldValue);
            }
        } else {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }

    parsePath (exp) {
        if (/[^\w.$]/.test(exp)) return;

        exp = exp.split('.');
        return function (obj) {
            for (let i = 0, len = exp.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exp[i]];
            }
            return obj;
        }
    }

    addDep (target) {
        let id = target.id;
        if (!this.depIds.has(id)) {
            this.depIds.add(id);
            this.deps.push(target);
            target.addSub(this);
        }
    }

    destroy () {
        let i = this.deps.length;
        while (i--) {
            this.deps[i].removeSub(this);
        }
    }
}