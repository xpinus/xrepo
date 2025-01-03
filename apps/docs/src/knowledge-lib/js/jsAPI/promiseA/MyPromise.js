// promise的三种状态
const PENDING = 'PENDING';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 实现自己的Promise
 * @param fn 接受resolve和reject的执行函数
 */
function MyPromise(fn) {
    const that = this;
    this.status = PENDING; // 初始状态
    this.value = null; // 成功的结果
    this.reason = null; // 失败的原因

    this.onFulfilledCallbacks = []; // 存储成功和失败的回调
    this.onRejectedCallbacks = [];

    try {
        fn(resolve, reject); // 执行传入的函数，传入resolve和reject回调方法
    } catch (e) {
        reject(e); // 如果传入的函数抛出异常，自动reject
    }

    /**
     * 成功的回调
     * @param value 成功的结果
     */
    function resolve(value) {
        // 这里加setTimeout，避免用户给构造函数传递同步函数，使得resolve、reject立即执行，
        // 比then执行还早，then中的注册回调就没机会运行了
        setTimeout(function () {
            if (that.status === PENDING) {
                that.status = FULFILLED;
                that.value = value;

                that.onFulfilledCallbacks.forEach((callback) => {
                    callback(that.value);
                });
            }
        }, 0);
    }

    /**
     * 失败的回调
     * @param reason 失败的原因
     */
    function reject(reason) {
        // 同理
        setTimeout(function () {
            if (that.status === PENDING) {
                that.status = REJECTED;
                that.reason = reason;

                that.onRejectedCallbacks.forEach((callback) => {
                    callback(that.reason);
                });
            }
        }, 0);
    }
}

/**
 * promise.then
 * @param onFulfilled 成功时的回调函数
 * @param onRejected 失败时的回调函数
 * @returns {MyPromise}
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const that = this; // 保存一下this

    let promise2;
    switch (this.status) {
        case PENDING:
            promise2 = new MyPromise(function (resolve, reject) {
                that.onFulfilledCallbacks.push(function () {
                    // 在fullfilled后回调

                    try {
                        if (typeof onFulfilled !== 'function') {
                            // 如果onFulfilled不是函数，给一个默认函数，返回value
                            resolve(that.value);
                        } else {
                            var x = onFulfilled(that.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });

                that.onRejectedCallbacks.push(function () {
                    try {
                        if (typeof onRejected !== 'function') {
                            // 同理
                            reject(that.reason);
                        } else {
                            var x = onRejected(that.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            return promise2;
        case FULFILLED:
            promise2 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            resolve(that.value);
                        } else {
                            const x = onFulfilled(that.value);
                            // 调用promise解决过程
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
            return promise2;
        case REJECTED:
            promise2 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        if (typeof onRejected !== 'function') {
                            reject(that.reason);
                        } else {
                            var x = onRejected(that.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
            return promise2;
        default:
            // 出现了不可能存在的promise状态
            throw new Error('Uncaught Promise Status Error');
    }
};

/**
 * Promise 解决过程
 * @param promise2 then链式的下一个promise
 * @param x  第一个异步promise的结果
 * @param resolve
 * @param reject
 * @returns {*}
 */
function resolvePromise(promise, x, resolve, reject) {
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    // 这是为了防止死循环
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }

    // 如果 x 为 Promise ，则使 promise 接受 x 的状态
    if (x instanceof MyPromise) {
        if (x.status === PENDING) {
            x.then(function (y) {
                resolvePromise(promise, y, resolve, reject);
            }, reject);
        } else if (x.status === FULFILLED) {
            resolve(x.value);
        } else if (x.status === REJECTED) {
            reject(x.reason);
        }
    }

    // 如果 x 为对象或者函数
    // 根据 ECMAScript 规范，当 Promise 被 resolve 时，传入的值（即 x）可能是一个普通值，
    // 也可能是一个 thenable 对象。
    else if (typeof x === 'object' || typeof x === 'function') {
        // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
        if (x === null) {
            return resolve(x);
        }

        try {
            // then 是 thenable 对象的核心。
            // 为了避免重复调用 then，我们通过将 then 赋值给一个变量 then 来缓存它，
            // 这样我们就能减少重复访问 x.then 属性的开销。
            var then = x.then;
        } catch (error) {
            // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
            return reject(error);
        }

        // 如果 x 是一个 thenable 对象（即 x.then 存在并且是一个函数），那么 resolvePromise 必须调用 x.then 方法来让 x 作为一个异步的 Promise 来进行处理。
        if (typeof then === 'function') {
            var called = false;
            try {
                then.call(
                    x,
                    // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                    function (y) {
                        // 如果 resolvePromise 和 rejectPromise 均被调用，
                        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                        // 实现这条需要前面加一个变量called
                        if (called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    function (r) {
                        if (called) return;
                        called = true;
                        reject(r);
                    },
                );
            } catch (error) {
                // 如果调用 then 方法抛出了异常 e：
                // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
                if (called) return;

                // 否则以 e 为据因拒绝 promise
                reject(error);
            }
        } else {
            // 如果 x 不是一个 thenable 对象，那么我们可以直接将其作为 Promise 的最终值进行传递
            resolve(x);
        }
    } else {
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x);
    }
}

/* 非必要函数 */
MyPromise.prototype.resolve = function (parameter) {
    if (parameter instanceof MyPromise) {
        return parameter;
    }

    return new MyPromise(function (resolve) {
        resolve(parameter);
    });
};

MyPromise.prototype.reject = function (reason) {
    return new MyPromise(function (resolve, reject) {
        reject(reason);
    });
};

MyPromise.prototype.all = function (promiseList) {
    const retPromise = new MyPromise(function (resolve, reject) {
        let count = 0;
        let result = [];
        let length = promiseList.length;

        if (length === 0) return resolve(result);

        promiseList.forEach((promise, index) => {
            MyPromise.resolve(promise).then(
                function (value) {
                    count++;
                    result[index] = value; // 放入对应的位置
                    if (count === length) {
                        resolve(result);
                    }
                },
                (errReason) => reject(errReason),
            );
        });
    });

    return retPromise;
};

MyPromise.prototype.race = function (promiseList) {
    var resPromise = new MyPromise(function (resolve, reject) {
        var length = promiseList.length;

        if (length === 0) {
            return resolve();
        } else {
            for (var i = 0; i < length; i++) {
                MyPromise.resolve(promiseList[i]).then(
                    function (value) {
                        return resolve(value);
                    },
                    function (reason) {
                        return reject(reason);
                    },
                );
            }
        }
    });

    return resPromise;
};

MyPromise.prototype.catch = function (onRejected) {
    this.then(null, onRejected);
};

MyPromise.prototype.finally = function (fn) {
    return this.then(
        function (value) {
            return MyPromise.resolve(fn()).then(function () {
                return value;
            });
        },
        function (error) {
            return MyPromise.resolve(fn()).then(function () {
                throw error;
            });
        },
    );
};

MyPromise.prototype.allSettled = function (promiseList) {
    return new MyPromise(function (resolve) {
        var length = promiseList.length;
        var result = [];
        var count = 0;

        if (length === 0) {
            return resolve(result);
        } else {
            for (var i = 0; i < length; i++) {
                (function (i) {
                    var currentPromise = MyPromise.resolve(promiseList[i]);

                    currentPromise.then(
                        function (value) {
                            count++;
                            result[i] = {
                                status: 'fulfilled',
                                value: value,
                            };
                            if (count === length) {
                                return resolve(result);
                            }
                        },
                        function (reason) {
                            count++;
                            result[i] = {
                                status: 'rejected',
                                reason: reason,
                            };
                            if (count === length) {
                                return resolve(result);
                            }
                        },
                    );
                })(i);
            }
        }
    });
};

// Promise/A+官方的测试工具promises-aplus-tests测试需要
// MyPromise.deferred = function () {
//     var result = {};
//     result.promise = new MyPromise(function (resolve, reject) {
//         result.resolve = resolve;
//         result.reject = reject;
//     });
//
//     return result;
// };

// 应该作为模块导出,我这里为了展示,直接写例子了
// module.exports = MyPromise;

console.log('1 + 1 等于几?');
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}).then((value) => {
    console.log(2);
});
