# 闭包

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

> 闭包是由封闭的函数和对函数声明所在词法环境的引用组合而成。 即，闭包让函数能访问它的外部作用域。

> 闭包会随着函数的创建而同时创建。

- 闭包就是能够读取其它函数作用域内部变量的函数

## 理解
- 用处：
  - 可以读取函数内部的变量，跨越作用域限制
  - 封装对象的私有属性和私有方法，实现封装
- **注意点**：
  - 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露
  - 解决方法是，在退出函数之前，将不使用的局部变量全部删除

## 闭包和 let 块级作用域

> 写一个隔一秒输出数组一项的函数

- 如果可以使用 ES6 语法，则可以这么写

```js
function print(arr) {
	for (let i = 0; i < arr.length; i++) {
		setTimeout(() => {
			console.log(arr[i]);
		}, 1000 * i);
	}
}
```

但是如果把这里的`let`改成`var`，则输出就会变成一连串的`undefined`。

有同学很快想到了这是闭包啊，因为`setTimeout`把函数加入到`microqueue`中，所以等到`setTimeout`的函数体执行时，`i`已经走完了`for`循环，变成了`arr.length`。`arr[arr.length]`显然是 undefined。

- 使用 ES5+闭包实现相同效果

```js
function print(arr) {
	for (var i = 0; i < arr.length; i++) {
		(function (index) {
			setTimeout(() => {
				console.log(arr[index]);
			}, 1000 * index);
		})(i);
	}
}
```
