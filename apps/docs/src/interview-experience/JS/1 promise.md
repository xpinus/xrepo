---
sort: 1
---

# Promise

## Promise

**回调地狱**:在 js 中我们经常会大量使用异步回调，例如使用 ajax 请求，面对复杂场景，太多的回调形成地狱

- Promise 有三种状态：**等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）**，且 Promise 必须为三种状态之一只有异步操作的结果，可以决定当前哪一种状态，任何其它操作都无法改变这个状态。
- **状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected** ，且状态改变之后不会再发生变化，会一直保持这个状态
- Pending 变为 Fulfilled 会得到一个私有**value**，Pending 变为 Rejected 会得到一个私有**reason**，当 Promise 达到了 Fulfilled 或 Rejected 时，执行的异步代码会接收到这个 value 或 reason。

> 构造函数

```js
// 构造函数, 返回一个Promise对象
const promise = new Promise((resolve, reject) => {
	// 某些异步操作
	// 成功通过resolve(value)返回结果
	// 失败通过reject(errmsg)返回信息
});
```

> 实例方法

```js
// 为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，onFulfilled 或 onRejected 不是一个函数），则返回 promise 被敲定时的值。
Promise.prototype.then();

// 为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。
Promise.prototype.catch();

// 为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。
Promise.prototype.finally();
```

> 静态方法

```js
// iterable一般传进去一个由多个Promise对象组成的数组
// 返回：一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。
// 结果：
// 	- 成功：iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。
//  - 失败：一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。
Promise.all(iterable);

// 与all类似的输入
// 输出区别：当所有的 promises 都已经结束无论是完成状态或者是失败状态，它都会返回一个 promise，这个 promise 将会包含一个关于描述每个 promise 状态结果的对象数组。
// [ {status: 'xxx', value: xxx} ]
Promise.allSettled(iterable);

// 接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。
// 不关心是否失败，关心第一个成功的，谁成功都行
Promise.any(iterable);

// 等到任意一个 promise 的状态变为已敲定。
// 关心第一个成功或者失败的结果
Promise.race(iterable);

// 返回一个状态为已拒绝的 Promise 对象，并将给定的失败信息传递给对应的处理函数。
Promise.reject(reason);

/* 
	返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable（即，带有 then 方法的对象），返回的Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。
  	通常而言，如果你不知道一个值是否是 promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象，这样就能将该 value 以 promise 对象形式使用。*/
Promise.resolve(value);
```

[allSettled 与 all 的区别](https://cloud.tencent.com/developer/article/1730975)

## async 和 await

async 是 es7 新增的关键字，用于定义异步函数。通过 async 定义的函数返回一个 Promise 对象

await 是等待 async 的异步执行，而且只能在 async 里面定义。sync 函数执行时，如果**遇到 await 就会先暂停执行 ，等到触发的异步操作完成后**，恢复 async 函数的执行并返回解析值。

await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。
