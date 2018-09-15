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
const $set = (state, paths, value) => {
    
};

const update = (state, pattern) => {
    let needUpdate = Object.keys(pattern);
    let allKeys = Object.keys(state);
    let nextState = {};
    for (let key of allKeys) {
        if (!needUpdate.includes(key)) {
            nextState[key] = state[key];
        } else {
            let updateOperation = pattern[key];
            let $set = updateOperation['$set'];
            nextState[key] = $set;
        }
    }
    return nextState;
};

var state = { name: 'Alice', todos: [] };
var nextState = update(state, {
    name: {$set: 'Bob'}
});
console.log(state.todos === nextState.todos); // true