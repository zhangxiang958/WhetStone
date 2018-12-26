/**
 *  <ul id='list' style='color: red'>
        <li class='item'>Item 1</li>
        <li class='item'>Item 2</li>
        <li class='item'>Item 3</li>
    </ul>
    const ul = {
        tagName: 'ul', // 节点标签名
        props: { // DOM的属性，用一个对象存储键值对
            id: 'list',
            style: 'color: red'
        },
        children: [ // 该节点的子节点
            {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
            {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
            {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
        ]
    }
 * 每个代表 DOM 节点的对象有三个属性：
 * tagName：代表 DOM 节点的标签名。
 * props：这个 DOM 节点的属性，用一个对象表示。
 * children：这个 DOM 节点的子节点，是一个数组；数组的元素可以是 字符串 或者 对象。
 * 如果是字符串就表示这个子节点是文本节点，否则就表示是另外一个 DOM 节点。
 * 
 * 在 Virtual DOM 的基础上给 VNode 类添加 render 方法，render 方法把一个虚拟的 DOM 节点渲染成真正的 DOM 节点，例如：
    const ul = h('ul', {id: 'list', style: 'color: red'}, [
        h('li', {class: 'item'}, ['Item 1']),
        h('li', {class: 'item'}, ['Item 2']),
        h('li', {class: 'item'}, ['Item 3'])
    ]);

    const ulDom = ul.render() // 渲染 DOM 节点和它的子节点
    ulDom.getAttribute('id') === 'list' // true
    ulDom.querySelectorAll('li').length === 3 // true
 */

class VNode {
    constructor({ tagName, props = {}, children = [] }) {
        this.tagName = tagName;
        this.props = props;
        this.children = children.filter(ele => {
            return typeof ele === 'string' || typeof ele === 'object';
        });
    }

    getTemplate() {
        let props = Object.keys(this.props).map(prop => {
            let val = this.props[prop];
            return `${prop}='${val}'`;
        });
        let children = this.children.map(ele => {
            if (ele instanceof VNode) {
                return ele.getTemplate();
            } else {
                return ele;
            }
        });
        let template = `<${this.tagName} ${props.join(' ')}>\n${children.join('\n')}\n</${this.tagName}>`;
        return template;
    }
    
    render_performance() {
        console.log(this.getTemplate());
        let container = document.createElement('div');
        container.innerHTML = this.getTemplate();
        return container.children[0];
    }

    render() {
        const $el = document.createElement(this.tagName);
        Object.keys(this.props).forEach((prop) => {
            $el.setAttribute(prop, this.props[prop]);
        });
        this.children
            .map((child) => {
                if (typeof child === 'string') return document.createTextNode(child);
                return child.render();
            })
            .forEach($el.appendChild.bind($el));
        return $el;
    }

    static changed(newNode, oldNode) {
        if (typeof newNode !== typeof oldNode) {
            return false;
        } else if (typeof newNode === 'string') {
            return newNode !== oldNode;
        } else {
            return newNode.tagName !== oldNode.tagName
        }
    }
    /**
     * 更新虚拟 DOM
     * @param {*} $root 
     * @param {*} newVNode instance of VNode
     * @param {*} oldVNode instance of VNode
     */
    static update($root, newVNode, oldVNode, index = 0) {
        if (!oldVNode) {
            $root.appendChild(newVNode.render());
        } else if (!newVNode) {
            $root.removeChild(
                $root.childNodes[index] // 这里需要使用 Node 节点数组不能用 children 数组，因为有可能是文本节点
            );
        } else if (this.changed(newVNode, oldVNode)){
            let $newVNode = newVNode instanceof VNode ? newVNode.render() : document.createTextNode(newVNode);
            console.log(newVNode);
            console.log(oldVNode);
            $root.replaceChild(
                $newVNode,
                $root.childNodes[index]
            );
        } else if (newVNode.tagName) {
            const newLength = newVNode.children.length;
            const oldLength = oldVNode.children.length;
            for (let i = 0; i < newLength || i < oldLength; i++) {
                this.update(
                    $root.childNodes[index],
                    newVNode.children[i],
                    oldVNode.children[i],
                    i
                );
            }
        }
    }
}

const h = function (tagName, props, children) {
    return new VNode({ tagName, props, children });
};



const ul = h('ul', {id: 'list', style: 'color: red'}, [
    h('li', {class: 'item'}, ['Item 1']),
    h('li', {class: 'item'}, ['Item 2']),
    h('li', {class: 'item'}, ['Item 3'])
]);

const ul2 = h('ul', {id: 'list', style: 'color: red'}, [
    h('li', {class: 'item'}, ['Item 1']),
    h('li', {class: 'item'}, ['Item 2']),
    h('li', {class: 'item'}, ['Item ha?'])
]);

const div = h('div', { id: 'bos', style: 'color: red' }, [
    h('p', { class: 'p' }, ['hello world'])
]);

const $root = document.getElementById('root');
console.log(ul);
console.log(ul.props.id === 'list'); // => true
console.log(ul instanceof VNode); // => true
const ulDom = ul.render() // 渲染 DOM 节点和它的子节点
$root.appendChild(ulDom);

console.log(ulDom.getAttribute('id') === 'list') // true
console.log(ulDom.querySelectorAll('li').length === 3) // true

document.getElementById('reload').addEventListener('click', () => {
    VNode.update($root, ul2, ul);
});