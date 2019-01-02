class Event {
    constructor() {
        this.eventMap = {};
    }

    bind(event, callback) {
        if (this.eventMap[event]) {
            this.eventMap[event].push(callback);
        } else {
            this.eventMap[event] = [callback];
        }
    }

    trigger(event, ...params) {
        if (this.eventMap[event]) {
            let cbList = this.eventMap[event];
            for (let cb of cbList) {
                cb.apply(null, params);
            }
        }
    }
}

class StateMachine {
    constructor() {
        this.Event = new Event();
    }

    add(state) {
        this.Event.bind('change', (current) => {
            if (state === current) {
                state.activate();
            } else {
                state.deactivate();
            }
        });

        state.active = () => {
            this.Event.trigger('change', state);
        }
    }
}

class State {
    constructor({ activate, deactivate }) {
        this.activate = typeof activate == 'function' ? activate : State.noop;
        this.deactivate = typeof deactivate == 'function' ? deactivate : State.noop;
    }

    static noop() {}
}

const stateMachine = new StateMachine();
const con1 = new State({
    activate: () => {
        console.log('con1 active');
    },
    deactivate: () => {
        console.log('con1 not active');
    }
});
const con2 = new State({
    activate: () => {
        console.log('con2 active');
    },
    deactivate: () => {
        console.log('con2 not active');
    }
});

stateMachine.add(con1);
stateMachine.add(con2);

con1.active();