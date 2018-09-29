const a = 'a';


Object.defineProperty(typeof global == 'object'? global : window, 'a', {
    value: 'a',
    writable: false,
    enumerable: true,
    configurable: false
});