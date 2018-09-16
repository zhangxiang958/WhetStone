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
const $set = (state, paths = [], value) => {
    let target = state;
    let last = paths.length - 1;
    for (let index = 0; index < last; index ++) {
        target = state[ paths[index] ];
    }
    target[last] = value;
};
const COMMAND = ['$set', '$unset', '$push'];
const OPERATION = { $set };

const buildPathsAndValue = (key, pattern) => {
    let paths = [key];
    let value = void 0;
    let type = void 0;
    let keys = Object.keys(pattern);
    for (let command of keys) {
        if (COMMAND.includes(command)) {
            value = pattern[command];
            type = command;
        } else {
            console.log(command, pattern[command]);
            let result = buildPathsAndValue(command, pattern[command]);
            paths = paths.concat(result.paths);
            value = result.value;
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
            OPERATION[type](nextState, paths, value);
        }
    }
    return nextState;
};

var state = { name: 'Alice', todos: [] };
var nextState = update(state, {
    name: {$set: 'Bob'}
});
console.log(state.todos === nextState.todos); // true