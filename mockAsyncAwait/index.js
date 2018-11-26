const isGeneratorFunction = function (func) {
    if (Object.prototype.toString.call(func) === '[object GeneratorFunction]') return true;
    return false;
};

const isGenerator = function (gen) {
    if (isGeneratorFunction(gen)) gen = gen();
    return gen && typeof gen.next === 'function' && typeof gen.throw === 'function';
};

const run = function (gen) {
    if (isGeneratorFunction) gen = gen();
    if (!isGenerator(gen)) throw new Error('gen must be a generator or generatorFunction');
    return function (final) {
        let next = function (val) {
            let result = gen.next(val);
            if (result.done) {
                return Promise.resolve(result.value);
            } else {
                if (result.value && typeof result.value.then == 'function') {
                    result.value.then(res => next(res));
                } else {
                    next(result.value);
                }
            }
        };
        next();
    };
};

run(function* (){
    let a = yield 1;
    let b = yield a + 2;
    let c = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 5000);
    });
    let d = c + b;
    console.log(d);
})();