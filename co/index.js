function compose (middlewares) {
    let index = -1;
    return (ctx, final) => {
        function next(i) {
            if (i <= index) throw new Error('next twice');
            index = i;
            let func = middlewares[index];
            if (!func) func = final || (() => Promise.resolve());
            return Promise.resolve(func.call(null, ctx, () => {
                return next(i + 1);
            }));
        }
        return next(0);
    }
}

compose([
    async function (ctx, next) {
        console.log('first');
        ctx.arr = [1];
        await next();
        console.log(ctx.arr);
    },
    async function (ctx, next) {
        console.log('second');
        ctx.arr.push(2);
        await next();
        console.log(ctx.arr);
    },
    async function (ctx, next) {
        console.log('third');
        ctx.arr.push(3);
        await next();
        console.log(ctx.arr);
    }
])(this);

const co = function (gen) {
    gen = gen();
    let ctx = this;
    return new Promise((resolve, reject) => {
        function next (res) {
            let result = gen.next(res);
            if (result.done) {
                resolve(result.value);
            } else {
                if (result.value instanceof Promise) {
                    result.value.then((promiseRes) => {
                        next(promiseRes);
                    }, (err) => {
                        reject(err);
                    });
                } else {
                    next(result.value);
                }
            }
        }

        next();
    });
};
co(function *(){
    console.log('co');
    let a = yield new Promise((resolve, reject) => {
        console.log('1');
        resolve(1);
    });
    let b = yield new Promise((resolve, reject) => {
        console.log('2');
        resolve(2);
    });
    let c = yield new Promise((resolve, reject) => {
        console.log('3');
        resolve(3);
    });
    console.log('co', a,b,c);
});