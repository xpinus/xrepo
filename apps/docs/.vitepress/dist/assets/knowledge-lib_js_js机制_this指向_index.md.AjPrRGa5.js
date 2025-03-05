import{t as e,ao as o,K as a,u as t,y as n,a0 as l,ac as h,q as p}from"./chunks/framework.Dt9YBBJv.js";const k=`let fun = (val) => {
    console.log(val); // 111
    // 下面一行会报错
    // Uncaught ReferenceError: arguments is not defined
    // 因为外层全局环境没有arguments对象
    console.log(arguments);
};
fun(111);
`,d=`function outer(val1, val2) {
    let argOut = arguments;
    console.log(argOut); // ①
    let fun = () => {
        let argIn = arguments;
        console.log(argIn); // ②
        console.log(argOut === argIn); // ③
        console.log(this);
    };
    fun();
}
outer(111, 222);
`,r=`var obj = {
    name: 'obj',
    sayName: () => {
        console.log('say: ' + this.name);
    },
};

console.log(obj.name);
obj.sayName();

var fn = obj.sayName;
fn();

var obj2 = {
    name: 'obj',
    sayName: function () {
        console.log('say: ' + this.name);
    },
};

obj2.sayName();

var fn2 = obj2.sayName;
fn2();
`,c=`var obj = {
    name: '张三',
    times: [1, 2, 3],
    print: function () {
        this.times.forEach(function (n) {
            console.log('1', this.name);
        }); // 某些数组方法可以接受一个函数当作参数。这些函数内部的 this 指向，很可能也会出错
    },
    print2: function () {
        this.times.forEach(
            function (n) {
                console.log('2', this.name);
            }.bind(this),
        );
    },
};

obj.print(); // 没有任何输出
obj.print2();
`,g=`var x = 20;
const obj = {
    x: 10,
    test: () => {
        console.log(this); // {}
        console.log(this.x); // undefined
    },
    test2: function () {
        const i = () => {
            console.log(this.x);
            // i 是以函数的形式被调用的，所以 this 指向全局
            // 在浏览器环境中打印出 JavaScript，node 里面为 undeifned
        };
        i();
    },
};
obj.test();
// {}
// undefined

obj.test2();
`,E=`Function.prototype.myApply = function (context, args = []) {
    context = context || globalThis; // 防止传入null或者undefined

    // 将当前函数挂载context上
    const symbol = Symbol();
    context[symbol] = this;

    // 执行函数
    const result = context[symbol](...args);

    // 删除临时的挂载
    delete context[symbol];

    return result;
};

function sayName() {
    console.log('我的名字是: ' + this.name);
}
const obj = {
    name: 'apply',
};
sayName();
sayName.myApply(obj);
`,y=`Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis; // 防止传入null或者undefined

    // 将当前函数挂载context上
    const symbol = Symbol();
    context[symbol] = this;

    // 执行函数
    const result = context[symbol](...args);

    // 删除临时的挂载
    delete context[symbol];

    return result;
};

function sayName() {
    console.log('我的名字是: ' + this.name);
}
const obj = {
    name: 'call',
};
sayName();
sayName.myCall(obj);
`,u=`Function.prototype.myBind = function (context, ...args) {
    // 获取当前函数
    const fn = this;

    return function (...newArgs) {
        return fn.apply(context, [...args, ...newArgs]); // bind参数具有柯里化的性质
    };
};

function sayName(age) {
    console.log('我的名字是: ' + this.name + ' 年龄：' + age);
}
const obj = {
    name: 'bind',
};
sayName(18);

const fn = sayName.bind(obj);
fn(18);
`,F=JSON.parse('{"title":"确定this指向","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/js机制/this指向/index.md","filePath":"knowledge-lib/js/js机制/this指向/index.md"}'),b={name:"knowledge-lib/js/js机制/this指向/index.md"},v=Object.assign(b,{setup(m){return(f,s)=>{const i=h("run-script");return p(),e("div",null,[s[0]||(s[0]=o(`<h1 id="确定this指向" tabindex="-1">确定<code>this</code>指向 <a class="header-anchor" href="#确定this指向" aria-label="Permalink to &quot;确定\`this\`指向&quot;">​</a></h1><ul><li>在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的 this 会被绑定到 undefined 上，在非严格模式下则会被绑定到全局对象 window/global 上。</li><li>一般使用 new 方法调用构造函数时，构造函数内的 this 会被绑定到新创建的对象上。</li><li>一般通过 call/apply/bind 方法显式调用函数时，函数体内的 this 会被绑定到指定参数的对象上。</li><li>一般通过上下文对象调用函数时，函数体内的 this 会被绑定到该对象上，也就是“谁调用它，this 就指向谁”</li><li>在箭头函数中，this 的指向是由外层（函数或全局）作用域来决定的。</li></ul><h2 id="全局环境中的-this" tabindex="-1">全局环境中的 this <a class="header-anchor" href="#全局环境中的-this" aria-label="Permalink to &quot;全局环境中的 this&quot;">​</a></h2><p><strong>非严格模式下，this 指向全局对象，严格模式下，this 会绑定到 undefined</strong>。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.a);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1，非严格模式下，this 指向全局对象 Window，这里相当于 Window.a</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	&quot;use strict&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.a);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Uncaught TypeError: Cannot read property &#39;a&#39; of undefined，严格模式下，this 会绑定到 undefined，尝试从 undefined 读取属性会报错</span></span></code></pre></div><h2 id="上下文对象调用中的-this" tabindex="-1">上下文对象调用中的 this <a class="header-anchor" href="#上下文对象调用中的-this" aria-label="Permalink to &quot;上下文对象调用中的 this&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	a: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	foo: foo, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &lt;-- foo函数 的调用位置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2，foo 在调用位置有上下文对象 obj，this 会隐式地绑定到 obj，this.a 相当于 obj.a</span></span></code></pre></div><ol><li>使用函数别名调用时</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bar </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj.foo; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bar === foo了，跟obj就没关系了</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1，赋值并不会改变引用本身，使用函数别名调用时，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bar 虽然是 obj.foo 的一个引用，但是实际上引用的还是 foo 函数本身，</span></span></code></pre></div><ol start="2"><li>函数作为参数传递时</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &lt;-- 调用位置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj.foo); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1, 参数传递也是一种隐式赋值，即使传入的是函数，这里相当于 fn = obj.foo，所以 fn 实际上引用的还是 foo 函数本身，this 应用默认绑定</span></span></code></pre></div><ol start="3"><li>this 指向绑定事件的元素。注意它和 target 的区别，target 是指向触发事件的元素</li></ol><h2 id="显式绑定" tabindex="-1">显式绑定 <a class="header-anchor" href="#显式绑定" aria-label="Permalink to &quot;显式绑定&quot;">​</a></h2><p>我们知道 <code>call</code>，<code>apply</code>，<code>bind</code> 等方法可以改变 <code>this</code> 的指向</p><p><code>apply</code>: apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入，且当第一个参数为null、undefined的时候，默认指向window(在浏览器中)，使用apply方法改变this指向后原函数会立即执行，且此方法只是临时改变thi指向一次。</p><p><code>call</code>: call方法的第一个参数也是this的指向，后面传入的是一个参数列表（注意和apply传参的区别）。当一个参数为null或undefined的时候，表示指向window（在浏览器中），和apply一样，call也只是临时改变一次this指向，并立即执行。</p>`,16)),a(i,{code:t(c)},null,8,["code"]),s[1]||(s[1]=n("h2",{id:"箭头函数",tabindex:"-1"},[l("箭头函数 "),n("a",{class:"header-anchor",href:"#箭头函数","aria-label":'Permalink to "箭头函数"'},"​")],-1)),s[2]||(s[2]=n("p",null,[l("箭头函数的 this 指向始终为外层的作用域。简单来说，箭头函数的 "),n("code",null,"this"),l(" 就是它"),n("strong",null,"外面第一个不是箭头函数的函数的 this"),l(".")],-1)),s[3]||(s[3]=n("blockquote",null,[n("p",null,"js箭头函数本质上是一个匿名函数表达式，其内this的指向是对应语句在创建执行上下文时确定的，而不是在调用时确定的")],-1)),a(i,{code:t(g)},null,8,["code"]),s[4]||(s[4]=n("h2",{id:"实现绑定this的方法",tabindex:"-1"},[l("实现绑定this的方法 "),n("a",{class:"header-anchor",href:"#实现绑定this的方法","aria-label":'Permalink to "实现绑定this的方法"'},"​")],-1)),a(i,{name:"手写apply",code:t(E)},null,8,["code"]),a(i,{name:"手写call",code:t(y)},null,8,["code"]),a(i,{name:"手写bind",code:t(u)},null,8,["code"]),s[5]||(s[5]=n("h2",{id:"面试题",tabindex:"-1"},[l("面试题 "),n("a",{class:"header-anchor",href:"#面试题","aria-label":'Permalink to "面试题"'},"​")],-1)),a(i,{code:t(k)},null,8,["code"]),a(i,{code:t(d)},null,8,["code"]),a(i,{code:t(r)},null,8,["code"]),s[6]||(s[6]=n("p",null,"手写 call、apply、bind",-1))])}}});export{F as __pageData,v as default};
