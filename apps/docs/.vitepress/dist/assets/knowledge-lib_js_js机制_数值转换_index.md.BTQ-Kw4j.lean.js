import{t as o,ao as n,K as i,u as r,ac as a,q as t}from"./chunks/framework.Dt9YBBJv.js";const s=`console.log([] == ![]); // true\r
// 1. 先执行![]，因为其有更高的优先级\r
// 2， ! 将对象强制强制为Boolean，任何对象都是true，所以结果为 !true\r
// 3， 接下来比较 [] == false，一边为对象，一边为原始值，将对象转换为原始值\r
// 4， []的toString方法会生效，转换为 '', 再把 ’‘ 转换为 boolean，结果为false\r
// 5， false == false 结果为true\r
\r
console.log([] + 1); // '1'\r
console.log(null + 1); // 1\r
console.log(null + undefined); // NaN\r
console.log(!null + 1); // 2\r
console.log(null + []); // 'null'\r
console.log(null + [1, 2]); // 'null1,2'\r
console.log(null + {}); // 'null[object Object]'\r
\r
var a = 3;\r
// console.log(a + a++ * ++a); // 18 =   3 * 5 + 3\r
console.log(a + ++a * a++); // 3 + 4 * 4 = 19     // 理解：++a或a++在执行的时候会获取a当前的最新值\r
console.log(a); // 5\r
\r
var b = 2;\r
console.log(b ** ((++b) ** ++b));\r
// 1. 2 ** 3 ** 4\r
// 2. 因为**是右结合，即 2 ** (3 ** 4)\r
// 3. 结果为 2 ** 81\r
\r
console.log(++[[]][+[]] + [+[]]); // '10'`,b=JSON.parse('{"title":"js机制-原始值强制转化","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/js机制/数值转换/index.md","filePath":"knowledge-lib/js/js机制/数值转换/index.md"}'),c={name:"knowledge-lib/js/js机制/数值转换/index.md"},f=Object.assign(c,{setup(u){return(d,l)=>{const e=a("run-script");return t(),o("div",null,[l[0]||(l[0]=n('<h1 id="js机制-原始值强制转化" tabindex="-1">js机制-原始值强制转化 <a class="header-anchor" href="#js机制-原始值强制转化" aria-label="Permalink to &quot;js机制-原始值强制转化&quot;">​</a></h1><p>强制（显式）转换：Number() String() Boolean()</p><p>在如下面场景<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2" target="_blank" rel="noreferrer">MDN</a>，会执行(隐式)类型转换</p><ul><li>Date()接收到不是预期的参数</li><li>±： 如果某个操作数是字符串，执行字符串串联；否则，执行数字相加</li><li>==：如果某个操作数是原始值，而另一个操作数是对象（object），则该对象将转换为没有首选类型的原始值</li><li>if等预期为boolen值的地方</li><li><code>* /</code>转换为数字</li></ul><h2 id="转换过程" tabindex="-1">转换过程 <a class="header-anchor" href="#转换过程" aria-label="Permalink to &quot;转换过程&quot;">​</a></h2><ul><li>如果值已经是原始值，则此操作不会进行任何转换</li><li><strong>number</strong>强制转换 <ul><li>undefined转换为NaN</li><li>null转换为0</li><li>boolean转换为1或0</li><li>string尝试转化为数字，失败返回NaN <ul><li>首尾空格被忽略</li><li>+-符号出现在开头被看作符号</li><li>Infinity被当作字面量</li><li>空字符串或字符串中只包含空格时，返回0</li><li>不允许数字分隔符 <ul><li>正常数字中，可以使用下划线（_，U+005F）作为分隔符以增强数字字面量的可读性</li></ul></li><li>与<code>parseInt</code>尽可能转换不同</li></ul></li><li>BigInt直接报错TypeError，防止导致精度误差</li><li>Symbol直接报错TypeError</li></ul></li><li><strong>string</strong>强制转换 <ul><li>undefined转换为&#39;undefined&#39;</li><li>null转换为&#39;null&#39;</li><li>boolean转换为&#39;false&#39;或&#39;true&#39;</li><li>数字使用toString(10)方法转换为字符串</li><li>Symbol直接报错TypeError</li><li>对象是先调用toString()方法，再调用valueOf()方法</li></ul></li><li><strong>boolean</strong>强制转换 <ul><li>±0、null、false、NaN、undefined、&#39;&#39;空字符串转换为false</li><li>任何对象转换为true</li></ul></li><li><strong>对象</strong>会依次调用下列方法尝试转换为原始值，如需要再继续转换 <ul><li><code>[Symbol.toPrimitive]()</code>: 如果存在，则必须返回原始值——返回对象，会导致 TypeError, 没有默认的实现，是用来自定义原始值转换行为的</li><li><code>valueOf()</code>: 如果返回对象，则忽略其返回值 <ul><li><code>[]</code>的<code>valueOf()</code>返回<code>[]</code></li></ul></li><li><code>toString()</code>: 如果仍然返回对象则报错：TypeError <ul><li>对象默认返回<code>[object Object]</code></li><li><code>[]</code>的<code>toString()</code>返回空字符串，默认<code>join(&#39;,&#39;)</code></li></ul></li></ul></li></ul>',6)),i(e,{code:r(s)},null,8,["code"])])}}});export{b as __pageData,f as default};
