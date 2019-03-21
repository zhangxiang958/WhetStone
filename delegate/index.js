const DOCUMENT_ELEMENT_TYPE = 9;

const matches = function (ele, selector) {
    let matches = document.querySelectorAll(selector);
    let i = matches.length;
    while(--i >= 0 && matches.item(i) !== ele) {}
    return i > -1;
};

Element.prototype.matches = Element.prototype.matches || matches;

const closest = function (ele, selector) {
    while (ele && ele.nodeType !== DOCUMENT_ELEMENT_TYPE) {
        if (matches(ele, selector)) {
            return ele;
        }
        ele = ele.parentNode;
    }
};

const delegate = function (base, selector, event, func, useCapture = false) {
    base.addEventListener(event, (e) => {
        let ele = closest(e.target, selector);
        if (ele) {
            func.call(ele, e);
        }
    }, useCapture);
};

delegate(document, 'li', 'click', () => {
    console.log('click');
}, false);

// let ul = document.getElementsByTagName('ul')[0];

// ul.addEventListener('click', (e) => {
//     const target = e.target;
//     console.log(target);
//     if (target.tagName.toLowerCase() === 'li') {
//         console.log('click');
//     }
// });