import{t as l,ao as i,K as e,u as s,y as t,a0 as o,ab as a,q as c}from"./chunks/framework.tQiMsDJj.js";const u=`// Promise的三种状态\r
const PENDING = 'pending';\r
const FULFILLED = 'fulfilled';\r
const REJECTED = 'rejected';\r
\r
// 判断是否是一个Promise\r
// 不用instanceof，因为只要符合规范的都是Promise\r
function isPromise(obj) {\r
    return !!(obj && obj.then && typeof obj.then === 'function');\r
}\r
\r
// 微任务 （惰性函数）\r
var runMircoTask = (function() {\r
        if (process && process.nextTick) {\r
            return (task) => process.nextTick(task);\r
        } else if (MutationObserver && typeof MutationObserver === 'function') {\r
            return (task) => {\r
                const span = document.createElement('span');\r
                const observer = new MutationObserver(task);\r
                observer.observe(span, {\r
                    childList: true,\r
                });\r
                span.innerHTML = '1';\r
            }\r
        } else {\r
            return (task) => setTimeout(task);\r
        }\r
})()\r
\r
class MyPromise {\r
    _status = PENDING;\r
    _value = undefined;\r
    _handlerQueue = [];\r
\r
    constructor(fn) {\r
        const resolve = this._resolve.bind(this);\r
        const reject = this._reject.bind(this);\r
\r
        try {\r
            fn(resolve, reject);\r
        } catch (error) {\r
            console.error(error);\r
            reject(error);\r
        }\r
    }\r
\r
    changeStatus(status, value) {\r
        if (this._status !== PENDING) return;\r
\r
        this._status = status;\r
        this._value = value;\r
        this._runHandlers();\r
    }\r
\r
    /**\r
     * 处理成功的响应数据\r
     * @private\r
     */\r
    _resolve(data) {\r
        this.changeStatus(FULFILLED, data);\r
    }\r
\r
    /**\r
     * 处理失败的响应数据\r
     * @private\r
     */\r
    _reject(reason) {\r
        this.changeStatus(REJECTED, reason);\r
    }\r
\r
    _pushQueue(handlerObj) {\r
        this._handlerQueue.push(handlerObj);\r
    }\r
\r
    _runHandlers() {\r
        if (this._status === PENDING) return;\r
\r
        while (this._handlerQueue.length) {\r
            const { handler, status, resolve, reject } = this._handlerQueue.shift();\r
\r
            if (status !== this._status) continue;\r
\r
            runMircoTask(() => {\r
                if (typeof handler !== 'function') {\r
                    resolve(this._value);\r
                    return;\r
                }\r
\r
                try {\r
                    const result = handler(this._value);\r
\r
                    if (isPromise(result)) {\r
                        try {\r
                            result.then((val) => {\r
                                resolve(val);\r
                            });\r
                        } catch (error) {\r
                            console.error(error);\r
                            reject(error);\r
                        }\r
                    } else {\r
                        resolve(result);\r
                    }\r
                } catch (error) {\r
                    console.error(error);\r
                    reject(error);\r
                }\r
            });\r
        }\r
    }\r
\r
    then(onFulfilled, onRejected) {\r
        return new MyPromise((resolve, reject) => {\r
            this._pushQueue({\r
                handler: onFulfilled,\r
                status: FULFILLED,\r
                resolve,\r
                reject,\r
            });\r
            this._pushQueue({\r
                handler: onRejected,\r
                status: REJECTED,\r
                resolve,\r
                reject,\r
            });\r
            this._runHandlers();\r
        });\r
    }\r
\r
    /* 其它 */\r
    catch(onRejected) {\r
        return this.then(null, onRejected);\r
    }\r
\r
    finally(onSettled) {\r
        return this.then(\r
            (data) => {\r
                onSettled();\r
                return data;\r
            },\r
            (reason) => {\r
                onSettled();\r
                return reason;\r
            },\r
        );\r
    }\r
\r
    static resolve(data) {\r
        if (data instanceof MyPromise) {\r
            return MyPromise;\r
        }\r
\r
        return new MyPromise((resolve, reject) => {\r
            if (isPromise(data)) {\r
                data.then(\r
                    (data) => resolve(data),\r
                    (reason) => reject(reason),\r
                );\r
            } else {\r
                resolve(data);\r
            }\r
        });\r
    }\r
\r
    static reject(reason) {\r
        return new MyPromise((resolve, reject) => {\r
            reject(reason);\r
        });\r
    }\r
\r
    /**\r
     * @param {iterator} promises\r
     */\r
    static all(promises) {\r
        return new MyPromise((resolve, reject) => {\r
            const result = [];\r
            let count = 0,\r
                settled = 0;\r
\r
            // all传进的参数为迭代器，因此不能使用一般的for循环\r
            for (const p of promises) {\r
                let index = count;\r
                count++;\r
\r
                p.then((data) => {\r
                    result[index] = data;\r
                    settled++;\r
\r
                    if (settled === count) {\r
                        resolve(result);\r
                    }\r
                }).catch((reason) => {\r
                    console.error(reason);\r
                    reject(reason);\r
                });\r
            }\r
        });\r
    }\r
}\r
\r
// 用例\r
(function () {\r
    const p2 = new MyPromise((resolve) => {\r
        setTimeout(() => {\r
            resolve(2);\r
        }, 100);\r
    });\r
\r
    MyPromise.all([MyPromise.resolve(1), p2, MyPromise.resolve(3)]).then(console.log);\r
})();\r
`,d=`function* add() {
    console.log('1 + 2 = ?');
    let res = yield Promise.resolve(3);
    console.log(res);
}

function run(task) {
    const generator = task(); // 1. 创造一个Gnerator
    let result = generator.next(); // 2. 第一次next，开始执行任务

    iter();

    // 不断迭代直到done
    function iter() {
        if (result.done) return;

        if (result.value instanceof Promise) {
            // 如果是一个promise则等待promise完成
            result.value.then(
                (data) => {
                    // 继续执行迭代器，将数据向下传递
                    result = generator.next(data);
                    iter();
                },
                (reason) => {
                    result = generator.throw(reason); // 在迭代器内抛出错误
                    iter();
                },
            );
        } else {
            result = generator.next(result.value);
            iter();
        }
    }

    return result.value;
}

run(add);
`,p=`console.log(1);\r
test();\r
console.log(4);\r
\r
async function test() {\r
	console.log(2);\r
	await 3;\r
	console.log(3);\r
}\r
`,h=`console.log("script start");\r
\r
async function async1() {\r
	await async2();\r
	console.log("async1 end");\r
}\r
async function async2() {\r
	console.log("async2 end");\r
	return Promise.resolve().then(() => {\r
		console.log("async2 end1");\r
	});\r
}\r
async1();\r
\r
setTimeout(function () {\r
	console.log("setTimeout");\r
}, 0);\r
\r
new Promise((resolve) => {\r
	console.log("Promise");\r
	resolve();\r
})\r
	.then(function () {\r
		console.log("promise1");\r
	})\r
	.then(function () {\r
		console.log("promise2");\r
	});\r
\r
console.log("script end");\r
`,m=`const p1 = new Promise((resolve) => {\r
	setTimeout(() => {\r
		resolve("resolve3");\r
	});\r
	resolve("resovle1");\r
	resolve("resovle2");\r
})\r
	.then((res) => {\r
		console.log(res);\r
		setTimeout(() => {\r
			console.log(p1);\r
		}, 100);\r
	})\r
	.finally(() => {\r
		console.log("finally");\r
	});\r
\r
// resolve只会执行一次\r
`,g=`new Promise((resolve) => {
    console.log(1);
    resolve();
})
    .then(() => {
        new Promise((resolve) => {
            console.log(2);
            resolve();
        }).then(() => {
            console.log(4);
        });
    })
    .then(() => {
        console.log(3);
    });
`,y=`async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
    console.log('promise2'); // 代码仍然会被执行
}).then(function () {
    console.log('promise3');
});

console.log('script end');
`,k=`async function async1() {\r
	console.log("async1 start");\r
	await async2();\r
	console.log("async1 end");  // await结束后会把后续内容推进微队列\r
}\r
async function async2() {\r
	console.log("async2");\r
	return Promise.resolve().then(() => {\r
		console.log("async2 end1");\r
	}); // Promise.resolve相当于把后续函数推进微队列\r
}\r
\r
console.log("script start");\r
\r
setTimeout(() => {\r
	console.log("setTimeout");\r
}, 0);\r
\r
async1();\r
\r
new Promise((resolve) => {\r
	console.log("promise1");\r
	resolve();\r
})\r
	.then(() => {\r
		console.log("promise2");\r
	})\r
	.then(() => {\r
		console.log("promise3");\r
	});\r
console.log("script end");\r
`,b=JSON.parse('{"title":"Promise","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/jsAPI/promiseA/index.md","filePath":"knowledge-lib/js/jsAPI/promiseA/index.md"}'),v={name:"knowledge-lib/js/jsAPI/promiseA/index.md"},E=Object.assign(v,{setup(f){return(P,n)=>{const r=a("run-script");return c(),l("div",null,[n[0]||(n[0]=i(`<h1 id="promise" tabindex="-1">Promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;Promise&quot;">​</a></h1><blockquote><p>回调地狱:在 js 中我们经常会大量使用异步回调，例如使用 ajax 请求，面对复杂场景，太多的回调形成地狱</p></blockquote><ul><li>Promise 有三种状态：<strong>等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）</strong>，且 Promise 必须为三种状态之一只有异步操作的结果，可以决定当前哪一种状态，任何其它操作都无法改变这个状态。 <ul><li><strong>状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected</strong> ，且状态改变之后不会再发生变化，会一直保持这个状态</li></ul></li></ul><h2 id="创建promise的方法" tabindex="-1">创建promise的方法 <a class="header-anchor" href="#创建promise的方法" aria-label="Permalink to &quot;创建promise的方法&quot;">​</a></h2><ol><li>构造函数</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 构造函数, 返回一个Promise对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> promise</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 某些异步操作</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 成功通过resolve(value)返回结果</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 失败通过reject(errmsg)返回信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><ol start="2"><li>实例方法</li></ol><ul><li><code>Promise.prototype.then()</code>: 为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，onFulfilled 或 onRejected 不是一个函数），则返回 promise 被敲定时的值。</li><li><code>Promise.prototype.catch()</code>: 为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。</li><li><code>Promise.prototype.finally()</code>: 为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。</li></ul><ol start="3"><li>静态方法</li></ol><ul><li><code>Promise.all(iterable)</code>: 一个新的 promise 对象，等到所有的 promise 对象<strong>都成功</strong>或有<strong>任意一个失败</strong>。 <ul><li>接受一个promise组成的可迭代对象</li><li>结果： <ul><li>成功：iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。</li><li>失败：一旦有<strong>任意一个</strong> iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。</li></ul></li></ul></li><li><code>Promise.allSettled(iterable)</code>: 当<strong>所有</strong>的 promises 都已经结束无论是完成状态或者是失败状态，它都会返回一个 promise，这个 promise 将会包含一个关于描述每个 promise 状态结果的对象数组。 <ul><li>结果：<code>[ {status: &#39;xxx&#39;, value: xxx}, ... ]</code></li></ul></li><li><code>Promise.any(iterable)</code>: 当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。<strong>不关心是否失败，关心第一个成功的</strong>，谁成功都行</li><li><code>Promise.race(iterable)</code>: 等到任意一个 promise 的状态变为已敲定。关心<strong>第一个成功或者失败</strong>的结果。</li><li><code>Promise.reject(reason)</code>和<code>Promise.resolve(value)</code>: 返回一个状态已兑现的 Promise 对象，并将给定的信息传递给对应的处理函数</li></ul><h2 id="手写promise" tabindex="-1">手写promise <a class="header-anchor" href="#手写promise" aria-label="Permalink to &quot;手写promise&quot;">​</a></h2><p><a href="https://www.cnblogs.com/dennisj/p/12660388.html" target="_blank" rel="noreferrer">手写promise</a></p>`,12)),e(r,{code:s(u)},null,8,["code"]),n[1]||(n[1]=t("h2",{id:"async-和-await",tabindex:"-1"},[o("async 和 await "),t("a",{class:"header-anchor",href:"#async-和-await","aria-label":'Permalink to "async 和 await"'},"​")],-1)),n[2]||(n[2]=t("p",null,"async 是 es7 新增的关键字，用于定义异步函数。通过 async 定义的函数返回一个 Promise 对象",-1)),n[3]||(n[3]=t("p",null,[o("await 是等待 async 的异步执行，而且只能在 async 里面定义。sync 函数执行时，如果"),t("strong",null,"遇到 await 就会先暂停执行 ，等到触发的异步操作完成后"),o("，恢复 async 函数的执行并返回解析值。")],-1)),n[4]||(n[4]=t("p",null,"await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。",-1)),e(r,{name:"利用生成器和迭代器实现相同效果",code:s(d)},null,8,["code"]),n[5]||(n[5]=t("h2",{id:"面试题",tabindex:"-1"},[o("面试题 "),t("a",{class:"header-anchor",href:"#面试题","aria-label":'Permalink to "面试题"'},"​")],-1)),e(r,{code:s(p)},null,8,["code"]),e(r,{code:s(h)},null,8,["code"]),e(r,{code:s(m)},null,8,["code"]),e(r,{code:s(g)},null,8,["code"]),e(r,{code:s(y)},null,8,["code"]),e(r,{code:s(k)},null,8,["code"])])}}});export{b as __pageData,E as default};
