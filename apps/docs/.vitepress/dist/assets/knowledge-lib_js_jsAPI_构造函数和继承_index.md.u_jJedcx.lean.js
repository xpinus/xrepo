import{t as l,ao as t,K as n,u as a,y as e,ac as h,q as p}from"./chunks/framework.Dt9YBBJv.js";const k=`/* 父类 */
function Person(name) {
    this.name = name;
    this.showName = function () {
        return this.name;
    };
}
// 原型对象上添加属性
Person.prototype.age = 18;
Person.prototype.friends = ['小明', '小强'];

/* 子类 */
function Student(name) {
    Person.call(this, name); // 构造函数继承
}
Student.prototype = Object.create(Person.prototype); // 原型链继承
Student.prototype.constructor = Student;

let s1 = new Student('张三');
s1.showName();
console.log(s1.age); // 18
console.log(s1.friends); // ["小明", "小强"]
console.log(s1.constructor);

//问题：一个实例修改了原型属性，另一个实例的原型属性也会被修改
//解决：就TMD不要卸载prototype上
s1.friends.push('李四');
let p1 = new Person();
console.log(p1.friends); // ["小明", "小强", "李四"]
`,r=`/* 父类 */
class Person {
    age = 18;
    friends = ['小明', '小强'];

    constructor(name) {
        this.name = name;
    }

    showName = function () {
        console.log(this.name);
    };
}

/* 子类 */
class Student extends Person {
    constructor(name) {
        super(name);
    }
}

let s1 = new Student('张三');
s1.showName();
console.log(s1.age); // 18
console.log(s1.friends); // ["小明", "小强"]
console.log(s1.constructor);
`,o=`function myNew(constructor, ...args) {\r
    const obj = Object.create(constructor.prototype);\r
\r
    const result = constructor.apply(obj, args);\r
\r
    return result instanceof Object ? result : obj;\r
}\r
\r
function Person(name) {\r
    this.name = name;\r
}\r
Person.prototype.say = function () {\r
    console.log('my name is ' + this.name);\r
};\r
\r
const p = myNew(Person, '李四');\r
p.say();\r
`,d=`// class Example {\r
//     constructor(name) {\r
//         this.name = name;\r
//     }\r
//\r
//     func() {\r
//         console.log(this.name)\r
//     }\r
// }\r
\r
'use strict'; // 1. 类运行在严格模式\r
\r
function Example(name) {\r
    // 2. 类必须使用new调用\r
    if(!new.target) {\r
        throw new Error('Class constructor Example cannot be invoked without "new"');\r
    }\r
    this.name = name;\r
}\r
\r
Object.defineProperty(Example.prototype, 'func', {\r
    enumerable: false, // 3. 不可枚举\r
    value: function () {\r
        // 4. 类内方法不能使用new调用\r
        if(new.target) {\r
            throw new Error('Example.prototype.func is not a constructor');\r
        }\r
        console.log(this.name);\r
    }\r
})`,u=JSON.parse('{"title":"构造函数和继承","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/jsAPI/构造函数和继承/index.md","filePath":"knowledge-lib/js/jsAPI/构造函数和继承/index.md"}'),E={name:"knowledge-lib/js/jsAPI/构造函数和继承/index.md"},F=Object.assign(E,{setup(c){return(g,s)=>{const i=h("run-script");return p(),l("div",null,[s[0]||(s[0]=t('<h1 id="构造函数和继承" tabindex="-1">构造函数和继承 <a class="header-anchor" href="#构造函数和继承" aria-label="Permalink to &quot;构造函数和继承&quot;">​</a></h1><blockquote><p>通过 <code>new</code> 函数名 来实例化对象的函数叫 <code>构造函数</code>。</p></blockquote><p>任何的函数都可以作为构造函数存在。之所以有构造函数与普通函数之分，主要从功能上进行区别的，构造函数的主要功能为<strong>初始化对象，特点是和 new 一起使用</strong>。</p><p>new 就是在创建对象，从无到有，构造函数就是在为初始化的对象添加属性和方法。构造函数定义时<strong>首字母大写</strong>（规范）。</p><h2 id="一个新对象的过程-发生了什么" tabindex="-1">一个新对象的过程，发生了什么 <a class="header-anchor" href="#一个新对象的过程-发生了什么" aria-label="Permalink to &quot;一个新对象的过程，发生了什么&quot;">​</a></h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c8bfe229254f669ac66ac1ae37d279~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt=""></p><ul><li>创建一个空对象</li><li>空对象的<code>_proto_</code>指向了构造函数的<code>prototype</code></li><li>使用<code>apply</code>调用构造器函数，属性和方法被添加到 <code>this</code>引用的对象中</li><li>如果构造函数中没有返回其它对象，那么返回新创建的对象，否则，返回构造函数的结果</li></ul>',7)),n(i,{name:"实现new",code:a(o)},null,8,["code"]),s[1]||(s[1]=t(`<h2 id="构造函数上的方法" tabindex="-1">构造函数上的方法 <a class="header-anchor" href="#构造函数上的方法" aria-label="Permalink to &quot;构造函数上的方法&quot;">​</a></h2><ul><li>在构造函数上直接定义方法（不共享，不推荐）</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">say</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// 直接定义方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hello</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hello</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.say </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p2.say); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// false</span></span></code></pre></div><p>很明显，p1 和 p2 指向的不是一个地方。 所以 在构造函数上通过 this 来添加方法的方式来生成实例，<strong>每次生成实例，都是<code>新开辟一个内存空间</code>存方法</strong>。这样会导致内存的极大浪费，从而<code>影响性能</code>。</p><ul><li>通过原型添加方法（共享）</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">say</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 通过原型添加方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;张三&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;李四&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hello 张三</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hello 李四</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.say </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p2.say); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><p><strong><code>将私有属性定义到构造函数里，将公共方法放到原型对象上</code></strong></p><h2 id="javascript-如何实现继承" tabindex="-1">Javascript 如何实现继承 <a class="header-anchor" href="#javascript-如何实现继承" aria-label="Permalink to &quot;Javascript 如何实现继承&quot;">​</a></h2><ol><li>组合继承</li></ol><ul><li>通过借用构造函数来实现对实例属性的继承（<code>Parent.call(this,hello)</code>）</li><li>通过使用原型链实现对原型属性和方法的继承（<code>Child.prototype = new Parent()</code>）</li><li>缺点： <ul><li>调用了两次父类构造函数 Person（耗内存），子类的构造函数会代替原型上的那个父类构造函数。</li><li>父子构造函数的原型对象之间有共享问题</li></ul></li></ul>`,10)),n(i,{code:a(k)},null,8,["code"]),s[2]||(s[2]=e("ol",{start:"2"},[e("li",null,"类继承")],-1)),n(i,{code:a(r)},null,8,["code"]),n(i,{name:"类的函数实现细节",code:a(d)},null,8,["code"])])}}});export{u as __pageData,F as default};
