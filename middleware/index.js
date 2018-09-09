class Middleware {
    constructor() {
        this._queue = [];
    }

    use(middleware) {
        if (typeof middleware !== 'function') throw new Error('middleware must be function.');
        this._queue.push(middleware);
    }

    go(final) {
        let index = this._queue.length - 1;
        let mw = void 0;
        while (mw = this._queue[index]) {
            let next = this._queue[index + 1];
            if (!next) next = final;
            this._queue[index] = mw.bind(null, next);
            index --;
        }
        this._queue[0]();
    }
}

var middleware = new Middleware();

middleware.use(function(next) {
  var self = this;
  setTimeout(function() {
    self.hook1 = true;
    next();
  }, 10);
});

middleware.use(function(next) {
  var self = this;
  setTimeout(function() {
    self.hook2 = true;
    next();
  }, 10);
});

var start = new Date();
middleware.go(function() {
  console.log(this.hook1); // true
  console.log(this.hook2); // true
  console.log(new Date() - start); // around 20
});

module.exports = Middleware;