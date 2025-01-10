// Promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 判断是否是一个Promise
// 不用instanceof，因为只要符合规范的都是Promise
function isPromise(obj) {
    return !!(obj && obj.then && typeof obj.then === 'function');
}

// 微任务
function runMircoTask(task) {
    if (process && process.nextTick) {
        process.nextTick(task);
    } else if (MutationObserver && typeof MutationObserver === 'function') {
        const span = document.createElement('span');
        const observer = new MutationObserver(task);
        observer.observe(span, {
            childList: true,
        });
        span.innerHTML = '1';
    } else {
        setTimeout(task);
    }
}

class MyPromise {
    _status = PENDING;
    _value = undefined;
    _handlerQueue = [];

    constructor(fn) {
        const resolve = this._resolve.bind(this);
        const reject = this._reject.bind(this);

        try {
            fn(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    changeStatus(status, value) {
        if (this._status !== PENDING) return;

        this._status = status;
        this._value = value;
        this._runHandlers();
    }

    /**
     * 处理成功的响应数据
     * @private
     */
    _resolve(data) {
        this.changeStatus(FULFILLED, data);
    }

    /**
     * 处理失败的响应数据
     * @private
     */
    _reject(reason) {
        this.changeStatus(REJECTED, reason);
    }

    _pushQueue(handlerObj) {
        this._handlerQueue.push(handlerObj);
    }

    _runHandlers() {
        while (this._handlerQueue.length) {
            const { handler, status, resolve, reject } = this._handlerQueue.shift();

            if (status !== this._status) continue;

            if (typeof handler !== 'function') resolve(this._value);

            runMircoTask(() => {
                try {
                    const result = handler(this._value);

                    if (isPromise(result)) {
                        try {
                            result.then((val) => {
                                resolve(val);
                            });
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushQueue({
                handler: onFulfilled,
                status: FULFILLED,
                resolve,
                reject,
            });
            this._pushQueue({
                handler: onRejected,
                status: REJECTED,
                resolve,
                reject,
            });
            this._runHandlers();
        });
    }
}

// 用例
(function () {
    // new Promise((resolve, reject) => {
    //     resolve(2);
    // }).then(console.log);

    var promise = new MyPromise((resolve, reject) => {
        resolve(2);
    });

    promise.then(console.log);

    console.log(promise);

    console.log(3);
})();
