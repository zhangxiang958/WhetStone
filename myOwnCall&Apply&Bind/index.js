Function.prototype.myCall = function (thisArg = global) {
    const callSymbol = `${+new Date()}${Math.random().toString(36).substr(2)}`;
    thisArg[callSymbol] = this;
    let args = [];
    for (let i = 1, length = arguments.length; i < length; i++) {
        args.push(`arguments[${i}]`);
    }
    return eval(`thisArg['${callSymbol}'](${args})`);
};

Function.prototype.myApply = function (thisArg, arr) {
    const callSymbol = `${+new Date()}${Math.random().toString(36).substr(2)}`;
    thisArg[callSymbol] = this;

    let args = [];
    if (!arr) {
        return thisArg[callSymbol]();
    } else {
        for (let i = 0, length = arr.length; i < length; i++) {
            args.push(`arr[${i}]`);
        }
        return eval(`thisArg['${callSymbol}'](${args})`);
    }
};

const func = function () {
    console.log(this.name);
}

func.myCall({ name: 'test' });