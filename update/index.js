const update = (data, pattern) => {
    let needUpdate = Object.keys(pattern);
    
};

var state = { name: 'Alice', todos: [] };
var nextState = update(state, {
    name: {$set: 'Bob'}
});
console.log(state.todos === nextState.todos); // true