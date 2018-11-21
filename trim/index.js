const trim = function(str) {
    if (typeof str !== 'string') {
        throw new Error('trim only accept string data.');
    }
    let exeg = /^\s+(.*\w+)\s+$/;
    return str.replace(exeg, '$1');
}