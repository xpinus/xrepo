# JS API

## sort

原地算法，接收一个函数作为参数

1. 默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的
2. 如果 compareFn(a, b) 大于 0，b 会被排列到 a 之前。
3. 如果 compareFn(a, b) 小于 0，那么 a 会被排列到 b 之前；
4. 如果 compareFn(a, b) 等于 0，a 和 b 的相对位置不变。备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）

## Map和weakMap

https://cloud.tencent.com/developer/article/1862103


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