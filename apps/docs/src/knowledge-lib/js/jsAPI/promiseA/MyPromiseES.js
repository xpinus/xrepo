// Promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 判断是否是一个Promise
// 不用instanceof，因为只要符合规范的都是Promise
function isPromise(obj) {
    return !!(obj && obj.then && typeof obj.then === 'function');
}

// 微任务 （惰性函数）
var runMircoTask = (function() {
        if (process && process.nextTick) {
            return (task) => process.nextTick(task);
        } else if (MutationObserver && typeof MutationObserver === 'function') {
            return (task) => {
                const span = document.createElement('span');
                const observer = new MutationObserver(task);
                observer.observe(span, {
                    childList: true,
                });
                span.innerHTML = '1';
            }
        } else {
            return (task) => setTimeout(task);
        }
})()

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
            console.error(error);
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
        if (this._status === PENDING) return;

        while (this._handlerQueue.length) {
            const { handler, status, resolve, reject } = this._handlerQueue.shift();

            if (status !== this._status) continue;

            runMircoTask(() => {
                if (typeof handler !== 'function') {
                    resolve(this._value);
                    return;
                }

                try {
                    const result = handler(this._value);

                    if (isPromise(result)) {
                        try {
                            result.then((val) => {
                                resolve(val);
                            });
                        } catch (error) {
                            console.error(error);
                            reject(error);
                        }
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    console.error(error);
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

    /* 其它 */
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onSettled) {
        return this.then(
            (data) => {
                onSettled();
                return data;
            },
            (reason) => {
                onSettled();
                return reason;
            },
        );
    }

    static resolve(data) {
        if (data instanceof MyPromise) {
            return MyPromise;
        }

        return new MyPromise((resolve, reject) => {
            if (isPromise(data)) {
                data.then(
                    (data) => resolve(data),
                    (reason) => reject(reason),
                );
            } else {
                resolve(data);
            }
        });
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

    /**
     * @param {iterator} promises
     */
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const result = [];
            let count = 0,
                settled = 0;

            // all传进的参数为迭代器，因此不能使用一般的for循环
            for (const p of promises) {
                let index = count;
                count++;

                p.then((data) => {
                    result[index] = data;
                    settled++;

                    if (settled === count) {
                        resolve(result);
                    }
                }).catch((reason) => {
                    console.error(reason);
                    reject(reason);
                });
            }
        });
    }
}

// 用例
(function () {
    const p2 = new MyPromise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, 100);
    });

    MyPromise.all([MyPromise.resolve(1), p2, MyPromise.resolve(3)]).then(console.log);
})();
