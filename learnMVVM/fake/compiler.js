const Directives = {
    text (node, vm, exp) {
        let updater = Updater['text'];

        updater && updater(node, this._getVMValue(vm, exp));

        new Watcher(vm, exp, (value) => {
            updater && updater(node, this._getVMValue(vm, exp));
        });
    },

    model (node, vm, exp) {
        let updater = Updater['model'];

        updater && updater(node, this._getVMValue(vm, exp));

        new Watcher(vm, exp, (value) => {
            updater && updater(node, this._getVMValue(vm, exp));
        });

        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            let oldValue = this._getVMValue(vm, exp);
            if (newValue !== oldValue) {
                this._setVMValue(vm, exp, newValue);
            }
        });
    },

    html (node, vm, exp) {
        let updater = Updater['html'];

        updater && updater(node, this._getVMValue(vm, exp));

        new Watcher(vm, exp, (value) => {
            updater && updater(node, this._getVMValue(vm, exp));
        });
    },

    _getVMValue (vm, exp) {
        let value = vm;
        exp.split('.').forEach(key => {
            value = value[key];
        });
        return value;
    },

    _setVMValue (vm, exp, value) {
        let exps = exp.split('.');
        exps.forEach((key, idx) => {
            if (idx < exps.length - 1) {
                vm = vm[key];
            } else {
                vm[key] = value;
            }
        });
    }
};

const Updater = {
    text (node, value) {
        node.textContent = value === void 0 ? '' : value;
    },

    model (node, value) {
        node.value = value === void 0 ? '' : value;
    },

    html (node, value) {
        node.innerHTML = value === void 0 ? '' : value;
    },

    eventHandler (node, vm, exp, directive) {
        let [on, eventType] = directive.split(':');
        let methods = vm.opts.methods;
        let handler = methods[exp];
        if (eventType && handler) {
            node.addEventListener(eventType, (e) => {
                handler.call(vm, e);
            });
        }
    }
};

class Compiler {
    constructor (el, vm) {
        this.vm = vm;
        this.data = vm._data;
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }

    init () {
        this.compile(this.$fragment);
    }

    compile (el) {
        let childNodes = el.childNodes;

        [].slice.call(childNodes).forEach(node => {
            let textContent = node.textContent;
            let regex = /\{\{\s*(\w.*)\s*\}\}/;
            if (this.isElementNode(node)) {
                this.compileElement(node);
            } else if (this.isTextNode(node) && regex.test(textContent)) {
                this.compileText(node, RegExp.$1.trim());
            }
            if (node.childNodes && node.childNodes.length) {
                this.compile(node);
            }
        });
    }
    
    compileElement (node) {
        let attributes = node.attributes;
        [].slice.call(attributes).forEach(attr => {
            let key = attr.name;
            let value = attr.value;
            if (this.isDirective(key)) {
                let directive = key.replace('v-', '');
                if (this.isEventDirective(directive)) {
                    Updater.eventHandler(node, this.vm, value, directive);
                } else {
                    Directives[directive] && Directives[directive](node, this.data, value);
                }

                node.removeAttribute(key);
            }
        });
    }

    compileText (node, exp) {
        Directives['text'] && Directives['text'](node, this.data, exp);
    }

    node2Fragment (el) {
        let fragment = document.createDocumentFragment();
        let child;
        
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    isDirective (attr) {
        return !!~attr.indexOf('v-');
    }

    isEventDirective (attr) {
        return !!~attr.indexOf('on');
    }

    isElementNode (node) {
        return node && node.nodeType === 1;
    }

    isTextNode (node) {
        return node && node.nodeType === 3;
    }
}