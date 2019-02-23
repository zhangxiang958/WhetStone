class EventEmitter {
    constructor () {
        this.eventHandlers = {};
        this.listenerLimit = Infinity;
        this.ErrorEventName = 'error';
        this.newListenerEventName = 'newListener';
        this.removeListenerEventName = 'removeListener';
        this.ErrorEventDefaultHandler = (err) => {
            throw err; // Unhandled 'error' event
        };
        this.eventHandlers[this.newListenerEventName] = [];
        this.eventHandlers[this.removeListenerEventName] = [];
        this.on(this.ErrorEventName, this.ErrorEventDefaultHandler);
    }

    on (eventName, callback) {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];
        this.eventHandlers[eventName].push(callback);
        this.emit(this.newListenerEventName);
        if (this.eventHandlers[eventName].length > this.listenerLimit) {
            console.warn(`${eventName} listeners is more than ${this.listenerLimit}`);
        }
        return this;
    }

    off (eventName, callback) {
        if (!this.eventHandlers[eventName]) return this;
        let queue = this.eventHandlers[eventName];
        let index = queue.findIndex(cb => cb === callback);
        queue.splice(index, 1);
        this.emit(this.removeListenerEventName);
        return this;
    }

    once (eventName, callback) {
        let self = this;
        function onceCallback (...args) {
            callback(...args);
            self.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
        return this;
    }

    emit (eventName, ...args) {
        if (!this.eventHandlers[eventName]) return this;
        this.eventHandlers[eventName].forEach((cb) => {
            switch (args.length) {
                case 0:
                    cb.call(this);
                    return;
                case 1:
                    cb.call(this, args[0]);
                    return;
                case 2:
                    cb.call(this, args[0], args[1]);
                    return;
                case 3:
                    cb.call(this, args[0], args[1], args[2]);
                    return;
            }
            cb.apply(this, args);
            return;
        });
    }

    eventNames () {
        return Object.keys(this.eventHandlers);
    }

    listeners (eventName) {
        if (!this.eventHandlers[eventName]) return [];
        return this.eventHandlers[eventName];
    }

    listenerCount(eventName) {
        let listeners = this.listeners(eventName);
        if (listeners.length === 0) return 0;
        return listeners.length;
    }

    setMaxListeners (n) {
        n = Number(n);
        if (Number.isNaN(n) || n < 0) return this;
        this.listenerLimit = n;
        return this;
    }

    removeAllListeners (eventName) {
        if (!this.eventHandlers[eventName]) return this;
        this.eventHandlers[eventName] = [];
        if (eventName === this.ErrorEventName) {
            this.on('error', this.ErrorEventDefaultHandler);
        }
        return this;
    }

    prependListener (eventName, callback) {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];
        this.eventHandlers.unshift(callback);
        if (this.eventHandlers[eventName].length > this.listenerLimit) {
            console.warn(`${eventName} listeners is more than ${this.listenerLimit}`);
        }
        return this;
    }

    prependOnceListener (eventName, callback) {
        let self = this;
        function onceCallback (...args) {
            callback(...args);
            self.off(eventName, onceCallback);
        };
        this.prependListener(eventName, onceCallback);
    }
}

const event = new EventEmitter();

event.on('test', () => {
    console.log('test event happend');
});

event.emit('test');

let m = 0;
event.once('event', () => {
    console.log(++m);
});
event.emit('event');
// 打印: 1
event.emit('event');
// 不触发
event.emit('error', new Error('test'));

const NativeEventEmitter = require('events');

class MyEmitter extends NativeEventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('触发事件');
});
myEmitter.emit('event');
myEmitter.emit('error', new Error('错误信息'));
