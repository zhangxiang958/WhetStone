const deepClone = function (obj) {
    if (typeof obj !== 'object') return obj;
    let origin = [];
    let copy = [];

    function _clone (obj) {
        let newObj;
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            newObj = [];
            obj.forEach((i, idx) => {
                if (typeof i === 'object') {
                    newObj[idx] = _clone(i);
                } else {
                    newObj[idx] = i;
                }
            });
        } else {
            newObj = {};
            let index = origin.indexOf(obj);
            if (index >= 0) {
                return copy[index];
            }
            origin.push(obj);
            copy.push(newObj);
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] === 'object') {
                    newObj[key] = _clone(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            });
        }
        return newObj;
    }
    
    return _clone(obj);
};

let obj = {
    a: '1',
    b: 2,
    c: true
};

obj.d = obj;

console.log(obj);

let newObj = deepClone(obj);
console.log(newObj);
console.log(newObj === obj);
console.log(newObj.d === newObj);
console.log(newObj.d === obj.d);

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
对 JSON.parse / JSON.stringify 的评判
确实,这个方法虽然可以解决绝大部分是使用场景,但是却有很多坑.

1.他无法实现对函数 、RegExp等特殊对象的克隆

2.会抛弃对象的constructor,所有的构造函数会指向Object

3.对象有循环引用,会报错
*/
const clone = parent => {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];

    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;

        if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, 'RegExp')) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);
    
        if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);
    
        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }
    
        return child;
    };
    
    return _clone(parent);
};