class MVVM {
    constructor (opts) {
        this.opts = opts;
        this._data = opts.data || {};
        this.el = opts.el;

        new Observer(this._data);
        Object.keys(this._data).forEach(key => {
            this._proxyData.call(this, key);
        });

        new Compiler(this.el, this);
    }

    _proxyData (key, setter, getter) {
        let self = this;
        setter = setter || Object.defineProperty(self, key, {
            enumerable: true,
            configurable: false,
            set (newVal) {
                self._data[key] = newVal;
            },
            get () {
                return self._data[key];
            }
        });
    }

    $watch (key, cb, opts) {
        let vm = this._data;
        let watcher = new Watcher(vm, key, cb, opts);
        return {
            unwatch() {
                watcher.destroy();
            }
        }
    }

    $set (key, value) {
        
    }

    $delete (key) {}
}