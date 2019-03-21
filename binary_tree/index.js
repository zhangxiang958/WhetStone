// http://foreverz.cn/2016/10/19/%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%8EJavaScript/
class Node {
    constructor ({ val, left, right }) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(data) {
        let root = this.root;
        if (root === null) {
            this.root = new Node({ val: data, right: null, left: null });
        } else {
            this._insertNode(this.root, data);
        }
    }
    _insertNode (node, data) {
        if (data < node.val) {
            if (node.left === null) {
                node.left = new Node({ val: data, right: null, left: null });
            } else {
                this._insertNode(node.left, data);
            }
        } else {
            if (node.right === null) {
                node.right = new Node({ val: data, right: null, left: null });
            } else {
                this._insertNode(node.right, data);
            }
        }
    }
    travel (node) {
        if (node !== null) {
            console.log(node.val);
            this.travel(node.left);
            this.travel(node.right);
        }
    }
    levelOrderTraversal (node) {
        let queue = [];
        let result = [];
        let level = 0;
        queue[level] = [node];
        while (queue[level] && queue[level].length) {
            result[level] = [];
            let thisLevel = queue[level];
            let nextLevel = [];
            for (let n of thisLevel) {
                result[level].push(n.val);
                if (n.left) nextLevel.push(n.left);
                if (n.right) nextLevel.push(n.right);
            }
            level ++;
            if (nextLevel.length) {
                result[level] = [];
                queue[level] = nextLevel;
            }
        }
        console.log(result);
        return {
            nodeQueue: queue,
            valQueue: result
        };
    }
    invert (node) {
        if (node === null) return;
        this.invert(node.left);
        this.invert(node.right);
        let temp = node.left;
        node.left = node.right;
        node.right = temp;
    }
}

let tree = new BinaryTree();

tree.insert(5)
tree.insert(10)
tree.insert(1)
tree.insert(3)
tree.insert(20)
tree.insert(8)

tree.travel(tree.root);
let result = tree.levelOrderTraversal(tree.root);