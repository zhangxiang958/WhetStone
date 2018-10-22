/**
 * 深度优先遍历
 * @param {*} obj 
 */
function* walk(obj) {
    yield obj;
    if (obj instanceof Object)
        obj = Object.keys(obj).map(key => obj[key]);
    if (obj instanceof Array) {
        for (let val of obj) {
            yield* walk(val);
        }
    }
};

function async (gen) {
    gen = typeof gen == 'function' ? gen() : gen;
    return new Promise((resolve, reject) => {
        let next = function (value) {
            let res;
            try {
                res = gen.next(value);
            } catch(err) {
                reject(err);
            }
            if (res.done) {
                resolve(res.value);
            } else {
                if (typeof res.value == 'object' && typeof res.value.then == 'function') {
                    res.value.then(next);
                } else {
                    next(res.value);
                }
            }
        }
        next();
    });
};

let a = async(function* (){
    let res = walk({a: {c: [1, 'd', undefined]}, b: [{e: {f: ['g']}}, [1, {h:1}, {i:2}]]});
    for (let r of res) {
        console.log(r);
    }
});