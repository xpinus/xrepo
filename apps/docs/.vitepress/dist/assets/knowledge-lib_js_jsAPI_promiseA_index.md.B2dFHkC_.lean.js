import{a2 as l,t,aq as r,K as i,y as a,a0 as o,ab as n,q as p}from"./chunks/framework.jAttmLhR.js";const j=JSON.parse('{"title":"Promise","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/jsAPI/promiseA/index.md","filePath":"knowledge-lib/js/jsAPI/promiseA/index.md"}'),d={name:"knowledge-lib/js/jsAPI/promiseA/index.md"};function m(h,s,c,k,g,u){const e=n("run-script");return p(),t("div",null,[s[0]||(s[0]=r(`<h1 id="promise" tabindex="-1">Promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;Promise&quot;">​</a></h1><blockquote><p>回调地狱:在 js 中我们经常会大量使用异步回调，例如使用 ajax 请求，面对复杂场景，太多的回调形成地狱</p></blockquote><ul><li>Promise 有三种状态：<strong>等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）</strong>，且 Promise 必须为三种状态之一只有异步操作的结果，可以决定当前哪一种状态，任何其它操作都无法改变这个状态。 <ul><li><strong>状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected</strong> ，且状态改变之后不会再发生变化，会一直保持这个状态</li></ul></li></ul><h2 id="创建promise的方法" tabindex="-1">创建promise的方法 <a class="header-anchor" href="#创建promise的方法" aria-label="Permalink to &quot;创建promise的方法&quot;">​</a></h2><ol><li>构造函数</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 构造函数, 返回一个Promise对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> promise</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 某些异步操作</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 成功通过resolve(value)返回结果</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 失败通过reject(errmsg)返回信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><ol start="2"><li>实例方法</li></ol><ul><li><code>Promise.prototype.then()</code>: 为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，onFulfilled 或 onRejected 不是一个函数），则返回 promise 被敲定时的值。</li><li><code>Promise.prototype.catch()</code>: 为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。</li><li><code>Promise.prototype.finally()</code>: 为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。</li></ul><ol start="3"><li>静态方法</li></ol><ul><li><code>Promise.all(iterable)</code>: 一个新的 promise 对象，等到所有的 promise 对象<strong>都成功</strong>或有<strong>任意一个失败</strong>。 <ul><li>接受一个promise组成的可迭代对象</li><li>结果： <ul><li>成功：iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。</li><li>失败：一旦有<strong>任意一个</strong> iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。</li></ul></li></ul></li><li><code>Promise.allSettled(iterable)</code>: 当<strong>所有</strong>的 promises 都已经结束无论是完成状态或者是失败状态，它都会返回一个 promise，这个 promise 将会包含一个关于描述每个 promise 状态结果的对象数组。 <ul><li>结果：<code>[ {status: &#39;xxx&#39;, value: xxx}, ... ]</code></li></ul></li><li><code>Promise.any(iterable)</code>: 当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。<strong>不关心是否失败，关心第一个成功的</strong>，谁成功都行</li><li><code>Promise.race(iterable)</code>: 等到任意一个 promise 的状态变为已敲定。关心<strong>第一个成功或者失败</strong>的结果。</li><li><code>Promise.reject(reason)</code>和<code>Promise.resolve(value)</code>: 返回一个状态已兑现的 Promise 对象，并将给定的信息传递给对应的处理函数</li></ul><h2 id="手写promise" tabindex="-1">手写promise <a class="header-anchor" href="#手写promise" aria-label="Permalink to &quot;手写promise&quot;">​</a></h2><p><a href="https://www.cnblogs.com/dennisj/p/12660388.html" target="_blank" rel="noreferrer">手写promise</a></p>`,12)),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/MyPromiseES.js"}),s[1]||(s[1]=a("h2",{id:"async-和-await",tabindex:"-1"},[o("async 和 await "),a("a",{class:"header-anchor",href:"#async-和-await","aria-label":'Permalink to "async 和 await"'},"​")],-1)),s[2]||(s[2]=a("p",null,"async 是 es7 新增的关键字，用于定义异步函数。通过 async 定义的函数返回一个 Promise 对象",-1)),s[3]||(s[3]=a("p",null,[o("await 是等待 async 的异步执行，而且只能在 async 里面定义。sync 函数执行时，如果"),a("strong",null,"遇到 await 就会先暂停执行 ，等到触发的异步操作完成后"),o("，恢复 async 函数的执行并返回解析值。")],-1)),s[4]||(s[4]=a("p",null,"await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。",-1)),i(e,{name:"利用生成器和迭代器实现相同效果",codePath:"knowledge-lib/js/jsAPI/promiseA/await.js"}),s[5]||(s[5]=a("h2",{id:"面试题",tabindex:"-1"},[o("面试题 "),a("a",{class:"header-anchor",href:"#面试题","aria-label":'Permalink to "面试题"'},"​")],-1)),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/questions/t1.js"}),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/questions/t2.js"}),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/questions/t3.js"}),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/questions/t4.js"}),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/questions/t5.js"}),i(e,{codePath:"knowledge-lib/js/jsAPI/promiseA/questions/t6.js"})])}const b=l(d,[["render",m]]);export{j as __pageData,b as default};
