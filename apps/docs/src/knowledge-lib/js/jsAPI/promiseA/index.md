
# Promise

> 回调地狱:在 js 中我们经常会大量使用异步回调，例如使用 ajax 请求，面对复杂场景，太多的回调形成地狱

- Promise 有三种状态：**等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）**，且 Promise 必须为三种状态之一只有异步操作的结果，可以决定当前哪一种状态，任何其它操作都无法改变这个状态。
  - **状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected** ，且状态改变之后不会再发生变化，会一直保持这个状态

## 创建promise的方法
1. 构造函数

```js
// 构造函数, 返回一个Promise对象
const promise = new Promise((resolve, reject) => {
	// 某些异步操作
	// 成功通过resolve(value)返回结果
	// 失败通过reject(errmsg)返回信息
});
```

2. 实例方法
- `Promise.prototype.then()`: 为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，onFulfilled 或 onRejected 不是一个函数），则返回 promise 被敲定时的值。
- `Promise.prototype.catch()`: 为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。
- `Promise.prototype.finally()`: 为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。


3. 静态方法
- `Promise.all(iterable)`: 一个新的 promise 对象，等到所有的 promise 对象**都成功**或有**任意一个失败**。
  - 接受一个promise组成的可迭代对象
  - 结果：
    - 成功：iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。
    - 失败：一旦有**任意一个** iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。
- `Promise.allSettled(iterable)`: 当**所有**的 promises 都已经结束无论是完成状态或者是失败状态，它都会返回一个 promise，这个 promise 将会包含一个关于描述每个 promise 状态结果的对象数组。
  - 结果：`[ {status: 'xxx', value: xxx}, ... ]`
- `Promise.any(iterable)`: 当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。**不关心是否失败，关心第一个成功的**，谁成功都行
- `Promise.race(iterable)`: 等到任意一个 promise 的状态变为已敲定。关心**第一个成功或者失败**的结果。
- `Promise.reject(reason)`和`Promise.resolve(value)`: 返回一个状态已兑现的 Promise 对象，并将给定的信息传递给对应的处理函数

## 手写promise

[手写promise](https://www.cnblogs.com/dennisj/p/12660388.html) 

<script setup>
import p from './MyPromiseES.js?raw';
import a from './await.js?raw';
import t1 from './questions/t1.js?raw';
import t2 from './questions/t2.js?raw';
import t3 from './questions/t3.js?raw';
import t4 from './questions/t4.js?raw';
import t5 from './questions/t5.js?raw';
import t6 from './questions/t6.js?raw';
</script>

<run-script :code="p">
</run-script>

## async 和 await

async 是 es7 新增的关键字，用于定义异步函数。通过 async 定义的函数返回一个 Promise 对象

await 是等待 async 的异步执行，而且只能在 async 里面定义。sync 函数执行时，如果**遇到 await 就会先暂停执行 ，等到触发的异步操作完成后**，恢复 async 函数的执行并返回解析值。

await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。

<run-script  name="利用生成器和迭代器实现相同效果" :code="a">
</run-script>

## 面试题

<run-script :code="t1"></run-script>

<run-script :code="t2"></run-script>
1. 同步代码执行
>  console.log("script start"); 是同步代码，首先执行，输出 script start。
>
>  调用 async1()，进入 async1 函数。
>
>  在 async1 中，遇到 await async2()，先执行 async2 函数。
>
>  async2 中的 console.log("async2 end"); 是同步代码，输出 async2 end。
>
>  async2 返回一个 Promise.resolve().then(...)，这是一个微任务，.then会被放入微任务队列。
>
>  async1 函数在 await 处暂停，等待 async2 的 Promise 完成。
>
>  继续执行同步代码，new Promise(...) 中的 console.log("Promise"); 是同步代码，输出 Promise。
>
>  Promise 的 resolve() 被调用，其后的 .then(...) 是微任务，放入微任务队列。
>
>  console.log("script end"); 是同步代码，输出 script end。
2. 异步代码执行
>  同步代码执行完毕后，开始执行微任务队列中的任务。
>
>  微任务队列中有两个任务：
>
>  async2 返回的 Promise.resolve().then(() => { console.log("async2 end1"); });，输出 async2 end1。
>
>  new Promise 的 .then(function () { console.log("promise1"); })，输出 promise1。
>
>  当第一个 .then 执行完毕后，会触发第二个 .then(function () { console.log("promise2"); })，输出 promise2。
>
>  微任务队列清空后，async1 函数中 await 的 Promise 完成，继续执行 console.log("async1 end");，输出 async1 end。
3. 宏任务执行
>  宏任务队列中有一个 setTimeout，等待所有微任务执行完毕后执行。输出 setTimeout。

<run-script :code="t3"></run-script>
<run-script :code="t4"></run-script>
<run-script :code="t5"></run-script>
<run-script :code="t6"></run-script>
