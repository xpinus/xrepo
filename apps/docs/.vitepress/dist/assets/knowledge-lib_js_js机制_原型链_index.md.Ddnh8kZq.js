import{t as l,ao as r,K as n,u as e,ac as c,q as s}from"./chunks/framework.Dt9YBBJv.js";const i="/assets/%E5%8E%9F%E5%9E%8B%E9%93%BE.CH1H9HGX.png",p=`function Person() {}
var person1 = new Person();

console.log(person1.constructor === Person);
console.log(Person.constructor === Function);
console.log(Function.constructor === Function);
`,a=`function Hello() {}
var h = new Hello();

console.log(Hello.prototype);
console.log(Hello.prototype.constructor === Hello);
console.log(h.prototype);
console.log(h.constructor === Hello);
console.log(h.constructor === Hello.prototype.constructor);
console.log(h.__proto__ === Hello.prototype);
console.log(h.__proto__ === h.constructor.prototype);
console.log(Hello.prototype === h.constructor.prototype);
console.log(Hello === h.constructor);
`,d=`function Hello() {}

console.log(Hello.constructor);
console.log(Hello.prototype.constructor);
console.log(Function.constructor);
console.log(Function.prototype.constructor);
console.log(Function.prototype);

// 与Object
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Function.__proto__.__proto__ === Object.prototype);
`,u=`const o = (function() {\r
    const obj = {\r
        a: 1,\r
        b: 2\r
    }\r
\r
    return {\r
        get: function(key) {\r
            return obj[key]\r
        }\r
    }\r
})();\r
\r
// 如何在不修改上面代码的情况下修改内部obj\r
\r
//\r
\r
Object.defineProperty(Object.prototype, 'hack', {\r
    get() {\r
        return this; // 返回对象自身，从而拿到数据\r
    }\r
})\r
\r
const r = o.get('hack');\r
r.c = 'ccc';\r
console.log(r)`,h=`const Foo = function () {\r
    this.a = function () {\r
        // 实例方法\r
        console.log('2');\r
    };\r
};\r
Foo.prototype.a = function () {\r
    // 原型链方法\r
    console.log('3');\r
};\r
Foo.a = function () {\r
    // 静态方法\r
    console.log('4');\r
};\r
let obj = new Foo();\r
obj.a(); // 打印什么？ 为什么\r
`,b=JSON.parse('{"title":"原型链","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/js机制/原型链/index.md","filePath":"knowledge-lib/js/js机制/原型链/index.md"}'),g={name:"knowledge-lib/js/js机制/原型链/index.md"},E=Object.assign(g,{setup(_){return(k,t)=>{const o=c("run-script");return s(),l("div",null,[t[0]||(t[0]=r(`<h1 id="原型链" tabindex="-1">原型链 <a class="header-anchor" href="#原型链" aria-label="Permalink to &quot;原型链&quot;">​</a></h1><blockquote><p>在 js 创立的时候，是秉持着流行的万物皆对象的思想，但只是想创建一门简单的语言，不想实现类和继承这样 C++、java 等语言复杂的机制，但又需要这种功能。在实现的时候不像 C++等语言<code>new 类</code>，然后调用”类“对应的”构造函数“，js 是<code>new 构造函数(constructor)</code>。但用构造函数生成实例对象，有一个缺点，就是无法共享属性和方法。因此创建了<code>prototype</code>属性对象（显示原型）。</p></blockquote><ul><li><p><code>prototype（显式原型）</code></p><ul><li><span style="color:red;">每一个函数（仅限函数）在创建之后都会拥有一个名为 prototype 的属性，这个属性指向函数的原型对象。</span></li><li>作用：用于放某同一类型实例的共享属性和方法，<strong>不会反复开辟存储空间，减少内存浪费</strong>， <ul><li>这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。</li><li>原型对象也有一个属性，叫做 constructor，这个属性包含了一个指针，指回原构造函数。</li></ul></li><li>原型中 this 指向实例化对象</li><li><strong>Note</strong>：通过<code>Function.prototype.bind</code>方法构造出来的函数是个例外，它没有 prototype 属性。</li></ul></li><li><p><code>[__proto__]（隐式原型）</code>:</p><ul><li><code>JavaScript</code>的所有对象中都包含了一个 <code>__proto__</code> 内部属性，所有引用类型都有，指向构造函数的显示原型</li><li>在 ES5 之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过<code>__proto__</code>来访问。ES6 中有了对于这个内置属性标准的方法: <ul><li><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setPrototypeOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// (写)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPrototypeOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// (读)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// (生成。创建)</span></span></code></pre></div></li></ul></li><li>作用：构成原型链，同样用于实现基于原型的继承。</li><li><strong>注意</strong>: <code>Object.prototype</code> 这个对象是个例外，它的<code>__proto__</code>值为 null</li></ul></li><li><p><code>constructor</code>：</p><ul><li><span style="color:red;">所有的 <code>prototype</code> 和 <code>实例化对象</code> 都有一个 constructor 属性，都指向关联的构造函数本身</span></li><li>所以<strong>constructor 属性其实就是一个拿来保存自己构造函数引用的属性</strong>，没有其他特殊的地方。</li></ul></li><li><p>原型链</p><ul><li>当一个对象调用的属性/方法自身不存在时，就会去自己 <code>[__proto__]</code> 关联的前辈 <code>prototype</code> 对象上去找</li><li>如果没找到，就会去该 <code>prototype</code> 原型 <code>[__proto__]</code> 关联的前辈 <code>prototype</code> 去找。依次类推，直到找到属性/方法或 <code>undefined</code> 为止。从而形成了所谓的“原型链”</li></ul></li></ul><p><img src="`+i+'" alt="原型链"></p><h2 id="原型链相关方法" tabindex="-1">原型链相关方法 <a class="header-anchor" href="#原型链相关方法" aria-label="Permalink to &quot;原型链相关方法&quot;">​</a></h2><ul><li><code>Object.getPrototypeOf()</code> 获取对象的原型对象</li><li><code>Object.setPrototypeOf()</code> 设置对象的原型对象</li><li><code>instanceof</code> 判断一个对象是否是一个构造函数的实例</li><li><code>isPrototypeOf()</code> 判断一个对象是否是一个另一个对象的原型对象</li><li><code>Object.create()</code> 创建对象</li><li><code>hasOwnProperty()</code> 判断对象是否本身拥有某个属性, 不会查看继承自原型的属性</li></ul><h2 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h2>',7)),n(o,{code:e(p)},null,8,["code"]),n(o,{code:e(a)},null,8,["code"]),n(o,{code:e(d)},null,8,["code"]),n(o,{name:"闭包代码的提权漏洞",code:e(u)},null,8,["code"]),n(o,{name:"解释代码",code:e(h)},null,8,["code"])])}}});export{b as __pageData,E as default};
