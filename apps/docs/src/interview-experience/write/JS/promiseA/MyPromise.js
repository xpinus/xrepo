// 手写promise https://www.cnblogs.com/dennisj/p/12660388.html
const PENDING = "PENDING";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
	const that = this;
	this.status = PENDING; // 初始状态
	this.value = null;
	this.reason = null;

	this.onFulfilledCallbacks = []; // 存储成功和失败的回调
	this.onRejectedCallbacks = [];

	try {
		fn(resolve, reject);
	} catch (e) {
		reject(e);
	}

	function resolve(value) {
		// 这里加setTimeout，避免用户给构造函数传递同步函数，使得resolve、reject立即执行，比then执行还早，then中的注册回调就没机会运行了
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
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	// onFulfilled onRejected必须是函数
	// 如果onFulfilled不是函数，给一个默认函数，返回value
	// 后面返回新promise的时候也做了onFulfilled的参数检查，这里可以删除，暂时保留是为了跟规范一一对应，看得更直观
	let realOnFulfilled = onFulfilled;
	if (typeof onFulfilled !== "function") {
		realOnFulfilled = function (value) {
			return value;
		};
	}

	// 同理
	let realOnRejected = onRejected;
	if (typeof realOnFulfilled !== "function") {
		realOnFulfilled = function (reason) {
			if (reason instanceof Error) {
				throw reason;
			} else {
				throw new Error(reason);
			}
		};
	}

	var that = this; // 保存一下this
	if (this.status === FULFILLED) {
		const promiseNext = new MyPromise(function (resolve, reject) {
			setTimeout(function () {
				try {
					if (typeof onFulfilled !== "function") {
						resolve(that.value);
					} else {
						const x = realOnFulfilled(that.value);
						// 调用promise解决过程
						resolvePromise(promiseNext, x, resolve, reject);
					}
				} catch (error) {
					reject(error);
				}
			}, 0);
		});

		return promiseNext;
	}

	if (this.status === REJECTED) {
		const promiseNext = new MyPromise(function (resolve, reject) {
			setTimeout(function () {
				try {
					if (typeof onRejected !== "function") {
						reject(that.reason);
					} else {
						var x = realOnRejected(that.reason);
						resolvePromise(promiseNext, x, resolve, reject);
					}
				} catch (error) {
					reject(error);
				}
			}, 0);
		});

		return promiseNext;
	}

	if (this.status === PENDING) {
		const promiseNext = new MyPromise(function (resolve, reject) {
			that.onFulfilledCallbacks.push(function () {
				try {
					if (typeof onFulfilled !== "function") {
						resolve(that.value);
					} else {
						var x = realOnFulfilled(that.value);
						resolvePromise(promiseNext, x, resolve, reject);
					}
				} catch (e) {
					reject(e);
				}
			});

			that.onRejectedCallbacks.push(function () {
				try {
					if (typeof onRejected !== "function") {
						reject(that.reason);
					} else {
						var x = realOnRejected(that.reason);
						resolvePromise(promiseNext, x, resolve, reject);
					}
				} catch (e) {
					reject(e);
				}
			});
		});

		return promiseNext;
	}
};

function resolvePromise(promise, x, resolve, reject) {
	// 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
	// 这是为了防止死循环
	if (promise === x) {
		return reject(
			new TypeError("The promise and the return value are the same")
		);
	}

	// 如果 x 为 Promise ，则使 promise 接受 x 的状态
	if (x instanceof MyPromise) {
		// 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
		if (x.status === PENDING) {
			x.then(function (y) {
				resolvePromise(promise, y, resolve, reject);
			}, reject);
		} else if (x.status === FULFILLED) {
			// 如果 x 处于执行态，用相同的值执行 promise
			resolve(x.value);
		} else if (x.status === REJECTED) {
			// 如果 x 处于拒绝态，用相同的据因拒绝 promise
			reject(x.reason);
		}
	}
	// 如果 x 为对象或者函数
	else if (typeof x === "object" || typeof x === "function") {
		// 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
		if (x === null) {
			return resolve(x);
		}

		try {
			// 把 x.then 赋值给 then
			var then = x.then;
		} catch (error) {
			// 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
			return reject(error);
		}

		// 如果 then 是函数
		if (typeof then === "function") {
			var called = false;
			// 将 x 作为函数的作用域 this 调用之
			// 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
			// 名字重名了，我直接用匿名函数了
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
					}
				);
			} catch (error) {
				// 如果调用 then 方法抛出了异常 e：
				// 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
				if (called) return;

				// 否则以 e 为据因拒绝 promise
				reject(error);
			}
		} else {
			// 如果 then 不是函数，以 x 为参数执行 promise
			resolve(x);
		}
	} else {
		// 如果 x 不为对象或者函数，以 x 为参数执行 promise
		resolve(x);
	}
}

/*
 * 非必要函数
 */
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
				(errReason) => reject(errReason)
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
					}
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
		}
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
								status: "fulfilled",
								value: value,
							};
							if (count === length) {
								return resolve(result);
							}
						},
						function (reason) {
							count++;
							result[i] = {
								status: "rejected",
								reason: reason,
							};
							if (count === length) {
								return resolve(result);
							}
						}
					);
				})(i);
			}
		}
	});
};

// 测试需要
MyPromise.deferred = function () {
	var result = {};
	result.promise = new MyPromise(function (resolve, reject) {
		result.resolve = resolve;
		result.reject = reject;
	});

	return result;
};

module.exports = MyPromise;
