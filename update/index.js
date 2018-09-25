/**
 * update
 * @param {*} state 
 * @param {*} pattern 
 * 指令
 * $set 整体替换
 * $unset 将数组中所有键去掉 (array of string)
 * $push 将所有元素放入数组中 (array)
 * $unshift 将所有元素放入数组中 (array)
 * $splice 目标调用 splice (array of array)
 * $merge 合并
 * $apply 使用函数的返回值来更新
 * $add (array of objects)
 * $remove (array of string)
 * 
 * extend 用于拓展指令
 */

const Util = {
    findTarget({ thisState, nextState, paths = [] }) {
        let pointer = thisState;
        let target = nextState;
        let last = paths.length - 1;
        for (let index = 0; index < last; index ++) {
            let key = paths[index];
            target[key] = Object.assign({}, pointer[key]);
            // 递归地往下查找
            target = target[key];
            pointer = pointer[key];
        }

        return {
            target,
            origin: pointer,
            key: paths[last]
        }
    }
};

const $set = ({thisState, nextState, paths = [], value}) => {
    let { target, key } = Util.findTarget({ thisState, nextState, paths });
    target[key] = value;
};

const $unset = ({ thisState, nextState, paths = [], value = [] }) => {
    let { target, key } = Util.findTarget({ thisState, nextState, paths });
    let result = {};
    for (let thisStateKey of Object.keys(thisState[key])) {
        if (value.includes(thisStateKey)) {
            continue;
        }
        result[thisStateKey] = thisState[key][thisStateKey];
    }
    target[key] = result;
};

const $push = ({thisState, nextState, paths = [], value}) => {
    let { target, origin, key } = Util.findTarget({ thisState, nextState, paths });
    target[key] = origin[key].concat(value);
};

const $unshift = ({ thisState, nextState, paths = [], value }) => {
    let { target, origin, key } = Util.findTarget({ thisState, nextState, paths });
    target[key] = value.concat(origin[key]);
};

const $splice = ({ thisState, nextState, paths = [], value }) => {
    let { target, origin, key } = Util.findTarget({ thisState, nextState, paths });
    target[key] = origin[key].slice(0);
    for (let arg of value) {
        Array.prototype.splice.apply(target[key], arg);
    }
};

const $merge = ({ thisState, nextState, paths = [], value }) => {
    let { target, origin, key } = Util.findTarget({ thisState, nextState, paths });
    target[key] = Object.assign({}, origin[key], value);
};

const $apply = ({ thisState, nextState, paths = [], value }) => {
    let { target, key } = Util.findTarget({ thisState, nextState, paths });
    if (typeof value !== 'function') throw new Error('$apply value must be a function');
    target[key] = value();
};

const $add = ({ thisState, nextState, paths = [], value }) => {
    let { target, origin, key } = Util.findTarget({ thisState, nextState, paths });
    if (!(origin[key] instanceof Map) || !(origin[key] instanceof Set)) throw new Error('$add must excute for Map of Set');
    if (origin[key] instanceof Map) {
        target[key] = new Map(origin[key]);
        for (let mapKey of value) {
            target[key].set(mapKey, val);
        }
    } else {
        target[key] = new Set(origin[key]);
        for (let [setKey] of value) {
            target[key].set(setKey);
        }
    }
};

const $remove = ({ thisState, nextState, paths = [], value = [] }) => {
    let { target, origin, key } = Util.findTarget({ thisState, nextState, paths });
    if (!(origin[key] instanceof Map) || !(origin[key] instanceof Set)) throw new Error('$add must excute for Map of Set');
    if (origin[key] instanceof Map) {
        target[key] = new Map(origin[key]);
        for (let delKey of value) {
            target[key].delete(delKey);
        }
    } else {
        target[key] = new Set(origin[key]);
        for (let delKey of value) {
            target[key].delete(delKey);
        }
    }
};

const OPERATION = { $set, $unset, $push, $unshift, $splice, $merge, $apply, $add, $remove };
const COMMAND = Object.keys(OPERATION);

const buildPathsAndValue = (key, pattern) => {
    let paths = [key];
    let value = void 0;
    let type = void 0;
    let keys = Object.keys(pattern);
    for (let command of keys) {
        if (COMMAND.includes(command)) {
            value = pattern[command];
            type = command;
            break;
        } else {
            let result = buildPathsAndValue(command, pattern[command]);
            paths = paths.concat(result.paths);
            ({ value, type } = result);
        }
    }

    return {
        paths,
        value,
        type
    };
};

const update = (state, pattern) => {
    let needUpdate = Object.keys(pattern);
    let allKeys = Object.keys(state);
    let nextState = {};
    for (let key of allKeys) {
        if (!needUpdate.includes(key)) {
            nextState[key] = state[key];
        } else {
            let { paths, value, type } = buildPathsAndValue(key, pattern[key]);
            OPERATION[type]({thisState: state, nextState, paths, value});
        }
    }
    return nextState;
};

var state = { 
    name: 'Alice',
    todos: [],
    testArr: ['fuck'],
    arr: ['fuck'],
    testUnset: {
        name: 'zhang',
        sex: 'man',
        age: 23
    },
    deep: {
        a: {
            b: {
                c: {
                    val: 1
                }
            },
            b2: []
        }
    }
};
var nextState = update(state, {
    name: {$set: 'Bob'},
    testArr: {$push: ['you']},
    arr: {$unshift: ['what', 'the']},
    testUnset: {$unset: ['name', 'sex']},
    deep: {
        a: {
            b: {
                c: {
                    val: {
                        $set: 2
                    }
                }
            }
        }
    }
});
console.log(state.todos === nextState.todos); // true
console.log(state.deep.a.b2 === nextState.deep.a.b2);
console.log(JSON.stringify(state));
console.log(JSON.stringify(nextState));

module.exports = update;