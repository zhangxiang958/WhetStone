class Middleware {
    constructor() {
        this._queue = [];
    }

    use(middleware) {
        if (typeof middleware !== 'function') throw new Error('middleware must be function.');
        this._queue.push(middleware);
    }

    go(final) {
        for (let index = this._queue.length - 1; index >= 1; index--) {
            let mw = this._queue[index];
            if (index == this._queue.length - 1) {
                this._queue[index] = mw.bind(this, final);
            } else {
                this._queue[index - 1] = this._queue[index - 1].bind(this, mw);
            }
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