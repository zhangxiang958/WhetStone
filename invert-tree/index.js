const invertTree = function (root) {
    
};

var root = {value: 6};
var left = {value: 4};
var right = {value: 8};
var leftOfLeft = {value: 3};
var rightOfLeft = {value: 5};
var leftOfRight = {value: 7};
var rightOfRight = {value: 9};
root.left = left;
root.right = right;
left.left = leftOfLeft;
left.right = rightOfLeft;
right.left = leftOfRight;
right.right = rightOfRight;

invertTree(root);

console.log(root.left.left.value); // should be 9

module.exports = invertTree;