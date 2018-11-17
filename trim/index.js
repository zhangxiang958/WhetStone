const trim = function(str) {
    if (typeof str !== 'string') {
        throw new Error('trim only accept string data.');
    }
    return str.replace(/^\s|\s$/, '');
}