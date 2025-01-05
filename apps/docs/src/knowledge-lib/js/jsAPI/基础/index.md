# JS API

## sort

原地算法，接收一个函数作为参数

1. 默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的
2. 如果 compareFn(a, b) 大于 0，b 会被排列到 a 之前。
3. 如果 compareFn(a, b) 小于 0，那么 a 会被排列到 b 之前；
4. 如果 compareFn(a, b) 等于 0，a 和 b 的相对位置不变。备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）

## Map和weakMap

https://cloud.tencent.com/developer/article/1862103

<run-script  codePath="knowledge-lib/js/jsAPI/src/map.js"></run-script>

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

性能比较：for > forEach > map

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

<run-script codePath="knowledge-lib/js/jsAPI/src/for_in.js">
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