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

    const urlDom = ul.render() // 渲染 DOM 节点和它的子节点
    ulDom.getAttribute('id') === 'list' // true
    ulDom.querySelectorAll('li').length === 3 // true
 */

class VNode {
    constructor({ tagName, props, children }) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }

    render() {
        
    }
}

const h = function () {

};



const ul = h('ul', {id: 'list', style: 'color: red'}, [
    h('li', {class: 'item'}, ['Item 1']),
    h('li', {class: 'item'}, ['Item 2']),
    h('li', {class: 'item'}, ['Item 3'])
]);

ul.props.id === 'list' // => true
ul instanceof VNode // => true