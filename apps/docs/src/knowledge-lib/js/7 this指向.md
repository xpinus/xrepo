---
sort: 7
---

# 确定`this`指向

ES5 定义的`this`的绑定规则，有以下 4 种：

## 默认绑定

**非严格模式下，this 指向全局对象，严格模式下，this 会绑定到 undefined**。

```js
var a = 1;

function foo() {
	console.log(this.a);
}

foo(); // 1，非严格模式下，this 指向全局对象 Window，这里相当于 Window.a

function bar() {
	"use strict";
	console.log(this.a);
}

bar(); // Uncaught TypeError: Cannot read property 'a' of undefined，严格模式下，this 会绑定到 undefined，尝试从 undefined 读取属性会报错
```

## 隐式绑定

**如果函数在调用位置有上下文对象，this 就会隐式地绑定到这个对象上**

```js
var obj = {
	a: 2,
	foo: foo, // <-- foo函数 的调用位置
};

obj.foo(); // 2，foo 在调用位置有上下文对象 obj，this 会隐式地绑定到 obj，this.a 相当于 obj.a
```

- 特殊情况 1：使用函数别名调用时

```js
var bar = obj.foo; // bar === foo了，跟obj就没关系了

bar();
// 1，赋值并不会改变引用本身，使用函数别名调用时，
// bar 虽然是 obj.foo 的一个引用，但是实际上引用的还是 foo 函数本身，
// 所以这里隐式绑定并没有生效， this 应用的是默认绑定
```

- 特殊情况 2：函数作为参数传递时

```js
function bar(fn) {
	fn(); // <-- 调用位置
}

bar(obj.foo); // 1, 参数传递也是一种隐式赋值，即使传入的是函数，这里相当于 fn = obj.foo，所以 fn 实际上引用的还是 foo 函数本身，this 应用默认绑定
```

## 显式绑定

我们知道 `call`，`apply`，`bind` 等方法可以改变 `this` 的指向

`apply`: apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入，且当第一个参数为null、undefined的时候，默认指向window(在浏览器中)，使用apply方法改变this指向后原函数会立即执行，且此方法只是临时改变thi指向一次。

`call`: call方法的第一个参数也是this的指向，后面传入的是一个参数列表（注意和apply传参的区别）。当一个参数为null或undefined的时候，表示指向window（在浏览器中），和apply一样，call也只是临时改变一次this指向，并立即执行。

```js
// bind 调用后不会执行，而是会返回一个硬绑定的函数，所以通过 bind 可以解决绑定丢失的问题
var bar = foo.bind(obj);

bar(); // 2，bar 是通过 bind 返回后的一个硬绑定函数，其内部应用了显式绑定
```

## `new`绑定

new 会返回一个对象，这个对象绑定到构造函数的 this

## 箭头函数

ES6 中新增了一种函数类型，**箭头函数**[2]，箭头函数中 `this` 不会应用上述规则，而是**根据最外层的词法作用域来确定 this**，简单来说，箭头函数的 `this` 就是它**外面第一个不是箭头函数的函数的 this**：

## 总结

- this 的绑定规则有四种：默认绑定，隐式绑定，显式绑定，new 绑定
- 无法应用其他 3 种规则时就是默认绑定，严格模式下 this 为 undefined，非严格模式下为全局对象
- 函数在调用位置有上下文对象时，this 会隐式绑定到这个对象
- 可以通过 call，apply，bind 显式地改变 this 的指向
- 通过 new 调用时，this 会绑定到调用函数，new 绑定是优先级最高的绑定
- 箭头函数中的 this 继承至它外层第一个不是箭头函数的函数
