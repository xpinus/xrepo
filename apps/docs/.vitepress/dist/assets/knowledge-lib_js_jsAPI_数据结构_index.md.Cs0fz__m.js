import{t as l,ao as t,K as a,u as n,y as e,a0 as h,ac as p,q as k}from"./chunks/framework.Dt9YBBJv.js";const o=`const a = 1;\r
\r
console.log(a.__proto__ === Number.prototype);\r
// 包装机制：当基础类型尝试去访问一个属性的时候，会转换为对应的包装类型\r
\r
console.log(a instanceof Number);\r
// a是基础类型是没有原型链的\r
`,r=`const a = 1;\r
console.log( a.__proto__ === Number.prototype)\r
console.log(a instanceof Number);\r
\r
`,d=`var a = { n: 1}\r
var b = a;\r
a.x = a = { n: 2 }\r
console.log(a.x)\r
console.log(b.x)\r
\r
\r
// 先定位a.x开辟空间，在执行后面的表达式`,c=`class MySet {
    constructor(iterator = []) {
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(\`\${iterator} is not iterable\`);
        }

        this._data = [];

        for (const item of iterator) {
            this.add(item);
        }
    }

    add(item) {
        if (!this.has(item)) {
            this._data.push(item);
        }
    }

    has(item) {
        for (const i of this._data) {
            if (isEqual(i, item)) {
                return true;
            }
        }
        return false;
    }

    delete(item) {
        for (let i = 0; i < this._data.length; i++) {
            if (isEqual(this._data[i], item)) {
                this._data.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    *[Symbol.iterator]() {
        for (const item of this._data) {
            yield item;
        }
    }
}

// 零值相等
function isEqual(a, b) {
    // 让 NaN === NaN, +0 === -0
    if (typeof a === 'number' && typeof b === 'number') {
        return a === b || (a !== a && b !== b);
    }

    return a === b;
}

const mySet = new MySet([1, 2, 3, 2, 'x']);
mySet.delete(1);
console.log(mySet);

for (const item of mySet) {
    console.log(item);
}
`,E=`class MyMap {
    constructor(iterator = []) {
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(\`\${iterator} is not iterable\`);
        }

        this._data = [];

        for (const item of iterator) {
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(\`\${item} is not iterable\`);
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value);
        }
    }

    set(key, value) {
        const obj = this._getObj(key);
        if (obj) {
            obj.value = value;
        } else {
            this._data.push({
                key,
                value,
            });
        }
    }

    has(key) {
        return !!this._getObj(key);
    }

    _getObj(key) {
        for (const i of this._data) {
            if (isEqual(i.key, key)) {
                return i;
            }
        }
    }

    forEach(callback) {
        for (const i of this._data) {
            callback(i.value, i.key, this);
        }
    }
}

// 同值相等
function isEqual(a, b) {
    if (a === 0 && b === 0) {
        return true;
    }
    return Object.is(a, b);
}

const mp1 = new MyMap([
    ['a', 3],
    ['b', 4],
    ['c', 5],
]);
const obj = {};
mp1.set(obj, 6456);
mp1.set('a', 'abc');

mp1.forEach((a1, a2, a3) => {
    console.log(a1, a2);
});
`,y=`function myInstanceof(left, right) {\r
    const rightPrototype = right.prototype;\r
    let leftPrototype = Object.getPrototypeOf(left); // left.__proto__ 非标准不推荐;\r
    while (leftPrototype) {\r
        if (leftPrototype === rightPrototype) {\r
            return true;\r
        }\r
        leftPrototype = Object.getPrototypeOf(leftPrototype);\r
    }\r
    return false;\r
}\r
\r
console.log(myInstanceof({}, Object));\r
`,m=JSON.parse('{"title":"数据类型和数据结构","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/jsAPI/数据结构/index.md","filePath":"knowledge-lib/js/jsAPI/数据结构/index.md"}'),u={name:"knowledge-lib/js/jsAPI/数据结构/index.md"},f=Object.assign(u,{setup(g){return(b,i)=>{const s=p("run-script");return k(),l("div",null,[i[0]||(i[0]=t('<h1 id="数据类型和数据结构" tabindex="-1">数据类型和数据结构 <a class="header-anchor" href="#数据类型和数据结构" aria-label="Permalink to &quot;数据类型和数据结构&quot;">​</a></h1><blockquote><p>ES中数据的分类分为基本数据类型和引用数据类型</p></blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8A%A8%E6%80%81%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%BC%B1%E7%B1%BB%E5%9E%8B" target="_blank" rel="noreferrer">MDN</a></p><h2 id="原始值" tabindex="-1">原始值 <a class="header-anchor" href="#原始值" aria-label="Permalink to &quot;原始值&quot;">​</a></h2><blockquote><p>除了 Object 以外，所有的类型都定义了不可变的、在语言最底层直接表示的值。我们将这些类型的值称为原始值。</p></blockquote><blockquote><p>原始值是不可变的——一旦创建了原始值，它就不能被改变，尽管持有它的变量可以被重新分配另一个值</p></blockquote><blockquote><p>除了 null 以外，所有的原始类型都可以使用 typeof 运算符进行测试。typeof null 返回 &quot;object&quot;，因此必须使用 === null 来测试 null</p></blockquote><p><code>Null</code> <code>Undefiend</code> <code>Boolean</code> <code>Number</code> <code>String</code> <code>Symbol</code> <code>BigInt</code></p><h3 id="null和undefined" tabindex="-1">null和undefined <a class="header-anchor" href="#null和undefined" aria-label="Permalink to &quot;null和undefined&quot;">​</a></h3><ul><li>从概念上讲，undefined 表示值缺失，null 表示对象缺失（这也解释了 typeof null === &quot;object&quot;）。当某些东西没有值时，JavaScript 语言通常默认为 undefined</li><li>null最重要的地方是原型链的末端，其次是与原型交互的方法，如 Object.getPrototypeOf()、Object.create() 等</li><li>null 是一个关键字，但 undefined 是一个普通的标识符，可以被重新赋值，这个标识符恰好是一个全局属性。</li></ul><h3 id="number" tabindex="-1">Number <a class="header-anchor" href="#number" aria-label="Permalink to &quot;Number&quot;">​</a></h3><ul><li>基于 IEEE 754 标准的双精度 64 位二进制格式的值</li><li>表示范围 <ul><li>存储 2^-1074<code>Number.MIN_VALUE</code>和 2^1023 × (2 - 2^-52)<code>Number.MAX_VALUE</code>之间的正浮点数，以及相同范围的负浮点数，</li><li>仅能安全地存储在 -(2^53 − 1)<code>Number.MIN_SAFE_INTEGER</code>到 2^53 − 1<code>Number.MAX_SAFE_INTEGER</code>范围内的整数。超出这个范围，JavaScript 将不能安全地表示整数；相反，它们将由双精度浮点近似值表示。</li><li>以使用 Number.isSafeInteger() 检查一个数是否在安全的整数范围内</li><li>超出范围会转换为 Infinity 或 -Infinity 或 +0 或 -0</li></ul></li><li>NaN（“Not a Number”）是一个特殊种类的数字值，当算术运算的结果不能表示为数字时，通常会遇到它。它也是 JavaScript 中唯一不等于自身的值。</li></ul><h3 id="symbol" tabindex="-1">Symbol <a class="header-anchor" href="#symbol" aria-label="Permalink to &quot;Symbol&quot;">​</a></h3><p>symbol 是一种基本数据类型（primitive data type）。Symbol() 函数会返回 symbol 类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的 symbol 注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法：&quot;new Symbol()&quot;。</p><p>每个从 Symbol() 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。更进一步的解析见—— glossary entry for Symbol。</p><blockquote><p>有哪些内置的symbol</p></blockquote><h3 id="包装类型" tabindex="-1">包装类型 <a class="header-anchor" href="#包装类型" aria-label="Permalink to &quot;包装类型&quot;">​</a></h3><blockquote><p><code>Boolean</code> <code>Number</code> <code>String</code>有对应的<code>对象包装类型</code>，它们为处理原始值提供了有用的方法。当在原始值上访问属性时，JavaScript 会自动将值包装成对应的包装对象，并访问对象上的属性。</p></blockquote><ol><li>自动创建一个对应的包装类型的实例</li><li>调用实例上的方法</li><li>销毁实例</li></ol>',19)),a(s,{name:"下列代码运行结果，解释一下",code:n(r)},null,8,["code"]),i[1]||(i[1]=t('<h2 id="object" tabindex="-1">Object <a class="header-anchor" href="#object" aria-label="Permalink to &quot;Object&quot;">​</a></h2><blockquote><p>在 JavaScript 中，对象可以被看作是一个属性的集合</p></blockquote><blockquote><p>属性键要么是字符串，要么是 symbol, 当其他类型（如数字）用于索引对象时，值会隐式地转化为字符串</p></blockquote><blockquote><p>有两种类型的对象属性：数据属性和访问器属性。每个属性都有对应的特性。 每个特性由 JavaScript 引擎进行内部访问 通过 <code>Object.defineProperty()</code> 设置它们，或通过 <code>Object.getOwnPropertyDescriptor()</code> 读取它们</p></blockquote><h3 id="数据属性" tabindex="-1">数据属性 <a class="header-anchor" href="#数据属性" aria-label="Permalink to &quot;数据属性&quot;">​</a></h3><blockquote><p>数据属性将键与值相关联</p></blockquote><ul><li>value: 数据属性的值, 通过属性的 get 访问获取值</li><li>writable: 属性值是否可写</li><li>enumerable: 是否可枚举</li><li>configurable: 数据属性是否可配置, 表示属性是否可以删除，是否可以更改为访问器属性，以及是否可以更改其特性</li></ul><h3 id="访问器属性" tabindex="-1">访问器属性 <a class="header-anchor" href="#访问器属性" aria-label="Permalink to &quot;访问器属性&quot;">​</a></h3><blockquote><p>数据属性的属性描述符中，如果配置了get和set，那么就是访问器属性 get和set配置均为函数，如果一个属性时访问器属性，则读取该属性时，会运行get方法，将返回值作为属性值，如果有set方法，则会运行set方法，将值作为新值，然后返回新值</p></blockquote><blockquote><p>对象的原型指向另一个对象或者 null——从概念上讲，它是对象的隐藏属性，通常表示为 [[Prototype]]。对象的 [[Prototype]] 的属性也可以在对象自身上访问。</p></blockquote><ul><li>get</li><li>set</li><li>enumerable</li><li>configurable</li></ul><h3 id="set和map" tabindex="-1">Set和Map <a class="header-anchor" href="#set和map" aria-label="Permalink to &quot;Set和Map&quot;">​</a></h3><h4 id="set" tabindex="-1">Set <a class="header-anchor" href="#set" aria-label="Permalink to &quot;Set&quot;">​</a></h4><blockquote><p>集合（set）中的元素只会出现一次，即集合中的元素是唯一的。</p></blockquote><ul><li><code>new Set()</code>: 接收参数为一个可迭代对象</li><li>值的相等是基于<code>零值相等算法</code></li></ul>',15)),a(s,{name:"手写Set",code:n(c)},null,8,["code"]),i[2]||(i[2]=e("h4",{id:"map",tabindex:"-1"},[h("Map "),e("a",{class:"header-anchor",href:"#map","aria-label":'Permalink to "Map"'},"​")],-1)),a(s,{name:"手写Map",code:n(E)},null,8,["code"]),i[3]||(i[3]=t(`<h4 id="weakmap和weakset" tabindex="-1">WeakMap和WeakSet <a class="header-anchor" href="#weakmap和weakset" aria-label="Permalink to &quot;WeakMap和WeakSet&quot;">​</a></h4><blockquote><p>WeakMap 和 WeakSet 只允许将可垃圾回收的值作为键，这些键要么是对象，要么是未注册的 symbol，即使键仍在集合中，也可能被回收。它们专门用于优化内存使用。</p></blockquote><h2 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h2><blockquote><p>JavaScript 中的数据类型有哪些？及各个数据类型是如何存储的?</p></blockquote><ul><li><p>基本数据类型有： Number； String；Boolean；Null；Undefined；Symbol； bigInt；</p><ul><li>基本数据类型的数据直接存储在栈中；</li><li>栈内存是自动分配和释放的，因为栈的内存管理由运行时环境负责，当函数调用结束时，相关的栈内存会被自动释放；</li></ul></li><li><p>引用数据类型统称为 Object 类型，细分的话有 Object；Array；Date；Function；RegExp等；</p><ul><li>引用数据类型的数据存储在堆中，在栈中保存的是数据的引用地址</li><li>堆内存是动态分配内存的，不会自动释放，而是由JavaScript的垃圾回收机制自动管理的</li></ul></li></ul><blockquote><p>在 JS 中为什么 0.2+0.1&gt;0.3?</p></blockquote><p>因为在 JS 中，浮点数是使用 64 位固定长度来表示的，其中的 1 位表示符号位，11 位 用来表示指数位，剩下的 52 位尾数位，由于只有 52 位表示尾数位。</p><p><strong>为什么不等于0.3</strong> 因为如0.1转为二进制是一个无限循环数,把它存到内存中再取出来转换成十进制就不是原来的0.1了,出现精度缺失。</p><p><strong>为什么大于</strong> 0.1 和 0.2 都转化成二进制后再进行运算，运算结果再转换为十进制，进度误差导致大于 0.3。</p><p><strong>那既然 0.1 不是 0.1 了，为什么在 console.log(0.1)的时候还是 0.1 呢</strong></p><ol><li>JavaScript 会自动将浮点数的二进制近似值转换回十进制并显示。</li><li>console.log() 对输出的浮点数进行了格式化处理，它展示的是一个易于理解的结果，即最接近的十进制表示</li></ol><blockquote><p>toFixed() 方法在遇到5的时候怎么有时进位有时舍弃？</p></blockquote><p>精度问题， 可以用Number.toPresision(20)验证</p><blockquote><p>判断数据类型的几种方法</p></blockquote><ul><li><code>Object.prototype.toString.call()</code>: 返回数据类型的字符串 <ul><li>可以区分 null 、 string 、boolean 、 number 、 undefined 、 array 、 function 、 object 、 date 、 math 数据类型</li><li>缺点：不能细分为谁谁的实例</li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object Array]&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({}); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object Object]&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object Number]&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;10&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object String]&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object Boolean]&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object Undefined]&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.toString.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;[object Null]&#39;</span></span></code></pre></div><ul><li><code>typeof</code>: 返回数据类型的字符串 <ul><li>缺点：typeof null 的值为 Object，无法分辨是 null 还是 Object <ul><li>为在 JavaScript 中，不同的对象都是使用二进制存储的，如果二进制前三位都是 0 的话，系统会判断为是 Object 类型，而 null 的二进制全是 0</li><li>000对象 001整型 010浮点数 100字符串 110布尔值</li></ul></li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // &#39;undefined&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;10&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // &#39;String&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // &#39;Number&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // &#39;Boolean&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;Symbol&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Function </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ‘function&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // ‘Object’ </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;Object&#39; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;Object</span></span></code></pre></div><ul><li><code>instanceof</code>: 返回 true 或者 false <ul><li>缺点：只能判断对象是否存在于目标对象的原型链上</li></ul></li></ul>`,19)),a(s,{name:"手写instaceof",code:n(y)},null,8,["code"]),i[4]||(i[4]=t(`<ul><li><code>constructor.name</code>: 返回数据类型的构造函数的名称</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> d </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> e </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() { console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ming&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> date </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> reg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[hbc]</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">at</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//ƒ Number() { [native code] } </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//Number </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(fn.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Function </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(date.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name)</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Date </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Array</span></span></code></pre></div><h2 id="面试题-1" tabindex="-1">面试题 <a class="header-anchor" href="#面试题-1" aria-label="Permalink to &quot;面试题&quot;">​</a></h2>`,3)),a(s,{code:n(o)},null,8,["code"]),i[5]||(i[5]=e("blockquote",null,[e("p",null,"typeof String(1) 和 typeof new String(1) 返回值的区别？ 为什么都能调用substr方法")],-1)),a(s,{code:n(d)},null,8,["code"])])}}});export{m as __pageData,f as default};
