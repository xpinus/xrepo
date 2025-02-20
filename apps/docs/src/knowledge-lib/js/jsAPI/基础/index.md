# JS API

> ES6+新特性

- let和const
- symbol, BigInt(表示大于2^53 - 1)
- 模板字符串
- 数组对象解构表达式
- Map和Set
- 数组的新方法:
  - Array.from()方法
  - includes()方法
  - map()、filter() 方法
  - forEach()方法
  - find()方法
  - some()、every() 方法
- object的新方法
  - Object.is()
  - Object.assign()
  - Object.keys()、Object.values()、Object.entries()
  - 对象声明简写
  - ...(对象扩展符)
- 函数方面
  - 参数默认值
  - 箭头函数
- class（类）
- promise
- 迭代器
- proxy
- ESM模块化
- 运算符

![es7~10](https://pic3.zhimg.com/80/v2-261666298bcc86402a7cac8c94ba013a_720w.jpg)

[[toc]]

## 面试题

### var、let、const的区别

- 暂时性死区
  - var不存在暂时性死区
  - let和const存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
- 块级作用域
  - var不存在块级作用域
  - let和const存在块级作用域, `{}`包裹的区域
- 重复声明
  - var允许重复声明变量
  - let和const在同一作用域不允许重复声明变量
- 修改声明的变量
  - var和let可以
  - const声明一个只读的常量。一旦声明，常量的值就不能改变，必须立即初始化
- 全局声明时，let是挂在Script作用域下，不会挂在Global

### Javascript 全局函数和全局变量

**全局变量**

- `Infinity` 代表正的无穷大的数值。
- `NaN` 指示某个值是不是数字值。
- `undefined` 指示未定义的值。

**全局函数**

- `decodeURI()` 解码某个编码的 `URI`。
- `decodeURIComponent()` 解码一个编码的 `URI` 组件。
- `encodeURI()` 把字符串编码为 URI。
- `encodeURIComponent()` 把字符串编码为 `URI` 组件。
- `escape()` 对字符串进行编码。
- `eval()` 计算 `JavaScript` 字符串，并把它作为脚本代码来执行。
- `isFinite()` 检查某个值是否为有穷大的数。
- `isNaN()` 检查某个值是否是数字。
- `Number()` 把对象的值转换为数字。
- `parseFloat()` 解析一个字符串并返回一个浮点数。
- `parseInt()` 解析一个字符串并返回一个整数。
- `String()` 把对象的值转换为字符串。
- `unescape()` 对由`escape()` 编码的字符串进行解码

### 箭头函数与普通函数的区别
**1. 语法更加简洁、清晰**

从上面的基本语法示例中可以看出，箭头函数的定义要比普通函数定义简洁、清晰得多，很快捷。

**2. 箭头函数不会创建自己的this（重要！！深入理解！！）**

箭头函数不会创建自己的this，所以它没有自己的this，它只会从自己的作用域链的上一层继承this。
箭头函数没有自己的this，它会捕获自己在**定义**时（注意，是定义时，不是调用时）所处的外层执行环境的this，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。

来看个例子：
```js
var id = 'Global';

function fun1() {
    // setTimeout中使用普通函数
    setTimeout(function(){
        console.log(this.id);
    }, 2000);
}

function fun2() {
    // setTimeout中使用箭头函数
    setTimeout(() => {
        console.log(this.id);
    }, 2000)
}

fun1.call({id: 'Obj'});     // 'Global'

fun2.call({id: 'Obj'});     // 'Obj'
```
上面这个例子，函数fun1中的setTimeout中使用普通函数，2秒后函数执行时，这时函数其实是在全局作用域执行的，所以this指向Window对象，this.id就指向全局变量id，所以输出'Global'。
但是函数fun2中的setTimeout中使用的是箭头函数，这个箭头函数的this在定义时就确定了，它继承了它外层fun2的执行环境中的this，而fun2调用时this被call方法改变到了对象{id: 'Obj'}中，所以输出'Obj'。


再来看另一个例子：

```js
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};

obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
```
上面这个例子，对象obj的方法a使用普通函数定义的，普通函数作为对象的方法调用时，this指向它所属的对象。所以，this.id就是obj.id，所以输出'OBJ'。
但是方法b是使用箭头函数定义的，箭头函数中的this实际是继承的它定义时所处的全局执行环境中的this，所以指向Window对象，所以输出'GLOBAL'。（这里要注意，定义对象的大括号{}是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中！！）

**3. 箭头函数继承而来的this指向永远不变（重要！！深入理解！！）**
上面的例子，就完全可以说明箭头函数继承而来的this指向永远不变。对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。

**4. .call()/.apply()/.bind()无法改变箭头函数中this的指向**
.call()/.apply()/.bind()方法可以用来动态修改函数执行时this的指向，但由于箭头函数的this定义时就已经确定且永远不会改变。所以使用这些方法永远也改变不了箭头函数this的指向，虽然这么做代码不会报错。

```js
var id = 'Global';
// 箭头函数定义在全局作用域
let fun1 = () => {
    console.log(this.id)
};

fun1();     // 'Global'
// this的指向不会改变，永远指向Window对象
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```


**5. 箭头函数不能作为构造函数使用**
我们先了解一下构造函数的new都做了些什么？简单来说，分为四步：

- JS内部首先会先生成一个对象；
- 再把函数中的this指向该对象；
- 然后执行构造函数中的语句；
- 最终返回该对象实例。

但是！！因为箭头函数没有自己的this，它的this其实是继承了外层执行环境中的this，且this指向永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用，或者说构造函数不能定义成箭头函数，否则用new调用时会报错！

```js
let Fun = (name, age) => {
    this.name = name;
    this.age = age;
};

// 报错
let p = new Fun('cao', 24);
```

**6. 箭头函数没有自己的arguments**
箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是外层局部（函数）执行环境中的值。

```js
// 例子一
let fun = (val) => {
    console.log(val);   // 111
    // 下面一行会报错
    // Uncaught ReferenceError: arguments is not defined
    // 因为外层全局环境没有arguments对象
    console.log(arguments); 
};
fun(111);

// 例子二
function outer(val1, val2) {
    let argOut = arguments;
    console.log(argOut);    // ①
    let fun = () => {
        let argIn = arguments;
        console.log(argIn);     // ②
        console.log(argOut === argIn);  // ③
    };
    fun();
}
outer(111, 222);
```
上面例子二，①②③处的输出结果如下：

很明显，普通函数outer内部的箭头函数fun中的arguments对象，其实是沿作用域链向上访问的外层outer函数的arguments对象。

可以在箭头函数中使用rest参数代替arguments对象，来访问箭头函数的参数列表！！

7. 箭头函数没有原型prototype
```js
   let sayHi = () => {
   console.log('Hello World !')
   };
   console.log(sayHi.prototype); // undefined
```

8. 箭头函数不能用作Generator函数，不能使用yeild关键字

### IIFE立即执行函数
顾名思义，该表达式一被创建就立即执行。

```js
(function(形参){
    函数体内容
})(实参);
```
IIFE函数是由一对()将函数声明包裹起来的表达式。使得JS编译器不再认为这是一个函数声明，而是一个IIFE，即立刻执行函数表达式。 但是两者达到的目的都是一样的，都是声明了一个函数并且随后调用这个函数。

IIFE的出现是为了弥补JS在scope方面的缺陷：JS只有全局作用域（global scope）、函数作用域（function scope），从ES6开始才有块级作用域（block scope）。

### 超过Number最大值怎么处理

BigInt

转换为字符串处理：bignumber.js, decimal.js, bi.js

https://www.cnblogs.com/caihongmin/p/17986687

### arguments是什么

是一个Arguments类型的类数组对象，是函数中传递的参数值的集合

### 数组、类数组、可迭代对象

数组：功能最强大，支持索引、长度和内置方法。

类数组：只有索引和长度，没有数组方法，通常需要转换为数组使用，不可迭代

可迭代对象：实现了 Symbol.iterator，可以用 for...of 遍历，但不一定有索引或长度。

### 迭代器和生成器


### 运算符

- 算数运算符
  - 加法运算符:+
    - 如果有字符串作字符串拼接
    - 转换成数字运算
  - %余数：结果的正负号由第一个运算数决定
  - 指数运算符：** 右结合
  - NaN 在作比较结果一定是false, 计算时结果一定是NaN

## function是按值传递还是引用传递？

按值传递

## sort

原地算法，接收一个函数作为参数

1. 默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的
2. 如果 compareFn(a, b) 大于 0，b 会被排列到 a 之前。
3. 如果 compareFn(a, b) 小于 0，那么 a 会被排列到 b 之前；
4. 如果 compareFn(a, b) 等于 0，a 和 b 的相对位置不变。备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）

## Map和weakMap

https://cloud.tencent.com/developer/article/1862103

<run-script  codePath="knowledge-lib/js/jsAPI/基础/src/map.js"></run-script>

## 断言

[JavaScript中不得不说的断言?](https://juejin.cn/post/6844903616902332424)


## 保护对象的操作（即阻止增、删、改的操作）

阻止 新增 属性：Object.preventExtensions()

阻止 增删 属性：Object.seal()

阻止 增删改 属性：Object.freeze()

## String.prototype.localeCompare()

js提供了字符串的对比方法localeCompare()，该方法返回的是一个数字用来表示一个参考字符串和对比字符串是排序在前，在后或者相同。该方法基本不单独使用，大部分时间是配合**字符串排序**使用的。

locales 和 options 参数可以自定义函数的行为，并让应用程序指定应使用哪种语言的格式约定。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

```js
// string.localeCompare(targetString,locales,options);

var strList = ['cc', 'ee', 'ca', 'aa'];
 
strList.sort((a, b) => {
	return a.localeCompare(b);
});
console.log(strList);   //["aa", "ca", "cc", "ee"]
```

## for和forEach区别
https://juejin.cn/post/7018097650687803422

1. 语法上的区别

```js
forEach((element, index, array) => { /* … */ }, thisArg)
// 其中thisArg可选，可以设置cb函数中的this指向

// 在js中有break return continue 对函数进行中断或跳出循环的操作，我们在 for循环中会用到一些中断行为，对于优化数组遍历查找是很好的，但由于forEach属于迭代器，只能按序依次遍历完成，所以不支持上述的中断行为。
// 借助try/catch：在forEach内触发throw Error

//  for 循环可以控制循环起点, forEach 的循环起点只能为0不能进行人为干预，而for循环不同
```
2. 本质区别

forEach 是负责遍历（Array Set Map）可迭代对象的，而 for 循环是一种循环机制，只是能通过它遍历出数组。

> 可迭代对象：ES6中引入了 iterable 类型，Array Set Map String arguments NodeList 都属于 iterable，他们特点就是都拥有 [Symbol.iterator] 方法，包含他的对象被认为是可迭代的 iterable。


3. 性能区别

性能比较：`for > forEach > map`

在chrome 62 和 Node.js v9.1.0环境下：for 循环比 forEach 快1倍，forEach 比 map 快20%左右。

原因分析for：for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。forEach：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。map：map 最慢的原因是因为 map 会返回一个新的数组，数组的创建和赋值会导致分配内存空间，因此会带来较大的性能开销。

## 在输入框中如何判断输入的是一个正确的网址

```js
function isUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}
```

## parseInt

```js
["1", "2", "3"].map(parseInt).forEach((item) => console.log(item));

// parseInt('1',0);radix 为 0，parseInt() 会根据十进制来解析，所以结果为 1；
// parseInt('2',1);radix 为 1，超出区间范围，所以结果为 NaN；
// parseInt('3',2);radix 为 2，用2进制来解析，应以 0 和 1 开头，所以结果为 NaN

["1", "2", "3"].map(Number).forEach((item) => console.log(item));
```

## Object.defineProperty 和 proxy

## Object.defineProperty
在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象 `Object.defineProperty(obj, prop, descriptor)
```js
let person = {
    name: '',
    age: 0
}
// 实现一个响应式函数
function defineProperty(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`访问了${key}属性`)
            return val
        },
        set(newVal) {
            console.log(`${key}属性被修改为${newVal}了`)
            val = newVal
        }
    })
}
// 实现一个遍历函数Observer
function Observer(obj) {
    Object.keys(obj).forEach((key) => {
        defineProperty(obj, key, obj[key])
    })
}
Observer(person)
console.log(person.age)
person.age = 18
console.log(person.age)

```

### Proxy

`const p = new Proxy(target, handler)`
参数:
- target:要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler:一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy[‘foo’]。
set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy[‘foo’] = v，返回一个布尔值。
has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for…in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(…args)、proxy.call(object, …args)、proxy.apply(…)。
construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(…args)。


## 复制到剪切板

<<< ./src/clipboard.js

## 保护对象

```js
// 开启严格模式: 阻止静默失败
"use strict";

// 对象具有: 增删改查 4个操作
// 其中 增删改 都会影响原对象
let obj = {
	id: 10001,
	name: "看看",
	age: 33,
};
/*
 * 1. 阻止 新增 属性
 */
// Object.preventExtensions(obj);
// obj.salary = 120000;  // 报错:Cannot add property salary, object is not extensible

/*
 * 2. 阻止 增删 属性
 *    seal: 密封
 */
// Object.seal(obj);
// obj.salary = 120000; // 报错:Cannot add property salary, object is not extensible
// delete obj.age;  // Cannot delete property 'age' of #<Object>

/*
 * 3. 阻止 增删改 属性
 *    freeze: 冻结
 */
// Object.freeze(obj);
// obj.salary = 220000; // 报错
// delete obj.age;
// obj.id = 33;

console.log(obj);

```

## for in

- 顺序问题：当属性的类型时数字类型时，会按照数字的从小到大的顺序进行排序，有限打印；字符串则按照时间顺序；
- for in 会枚举原型链中的属性

<run-script codePath="knowledge-lib/js/jsAPI/基础/src/for_in.js">
</run-script>

## escape\encodeURL\encodeURLComponet

都是用于编码URL或字符串的函数

- escape：弃用
- encodeURL：用于对URL的部分进行编码，对传入的完整url地址，仅将一些特殊字符转成可传输的形式，保留字符如 : // ? 等不变 
- encodeURLComponet：对URL的所有特殊字符进行编码

## toLocaleString
```js
Number.prototype.toLocaleString('zh', { style: "currency" })   // 转换成地区对应的数字表示方式 123，456   一二三,四五六
Number.prototype.toLocaleString('zh', { style: "currency" })   // 货币表示
```

## 符号绑定

类似指针，指向同一片内存空间

```js
// moduleA
export let count = 1;
exports function add() {
    count++;
}

// main.js
import { count, add } from "module";  // 具名导入

console.log(count) // 1
add();
console.log(count)  // 2  这明显是不符合预期的，因此模块中导出的最好是常量
```

## 箭头函数
> 箭头函数和普通函数的区别？
- this问题
  - 没有自己的 this，不能 new，不能调用 call 和 apply 没有 prototype，new 关键字内部需要把新对象的_proto_指向函数的 prototype
  - 箭头函数的 this 指向它定义时所在的对象，而不是调用时所 在的对象 
- 没有 arguments 对象，不能使用 arguments，如果要获取参数的话可以使用 rest 运算符
- 没有 yield 属性，不能作为生成器 Generator 使用
- 不会进行函数提升


## 数组的遍历方法与区别，那个性能更好

Object.keys和for in的区别

## Proxy和Reflect中的receiver到底是个什么东西

proxy get receiver：Proxy或者继承Proxy的对象

用途：Proxy继承场景下结合Relfect解决this指向问题

<run-script codePath="knowledge-lib/js/jsAPI/基础/src/receiver.js">
</run-script>

## 函数签名
> 函数名 + 函数列表 + 返回值

## Array.prototype.sort()
> sort() 方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序

> 由于它取决于具体实现，因此无法保证排序的时间和空间复杂度

由厂家自己实现的，core-js是[这样](https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/array-sort.js)
- 当length < 8, 插入排序
- 当length >= 8, 归并排序

## reduce第二个参数不传，默认会是第一项

## 隐藏类
> v8引擎中，当多个属性一致的js对象会重用一个隐藏类，减少new Class的开销

<run-script name="哪段代码效率更高" codePath="knowledge-lib/js/jsAPI/基础/src/q1.js"></run-script>

指导代码习惯：定义类或对象时，尽可能保证顺序一致

## 数组的快速模式和字典模式

<run-script name="哪段代码效率更高" codePath="knowledge-lib/js/jsAPI/基础/src/q2.js"></run-script>

v8是c++实现的，在实现数组时有多种实现方式
- “数组从0到length-1无空洞” 或者长度小于10万，会进入快速模式，存放为array
- “数组存在空洞”,会进入字典模式，存放为HashMap. 牺牲遍历性能，换取访问性能

编码习惯：从零开始初始化数组，让数组保持紧凑

## 判断object是否为空

最后一种更严谨

<run-script codePath="knowledge-lib/js/jsAPI/基础/src/q3.js"></run-script>