# 确定`this`指向

- 在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的 this 会被绑定到 undefined 上，在非严格模式下则会被绑定到全局对象 window/global 上。
- 一般使用 new 方法调用构造函数时，构造函数内的 this 会被绑定到新创建的对象上。
- 一般通过 call/apply/bind 方法显式调用函数时，函数体内的 this 会被绑定到指定参数的对象上。
- 一般通过上下文对象调用函数时，函数体内的 this 会被绑定到该对象上，也就是“谁调用它，this 就指向谁”
- 在箭头函数中，this 的指向是由外层（函数或全局）作用域来决定的。

## 全局环境中的 this

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

## 上下文对象调用中的 this

```js
var obj = {
	a: 2,
	foo: foo, // <-- foo函数 的调用位置
};

obj.foo(); // 2，foo 在调用位置有上下文对象 obj，this 会隐式地绑定到 obj，this.a 相当于 obj.a
```

1. 使用函数别名调用时
```js
var bar = obj.foo; // bar === foo了，跟obj就没关系了

bar();
// 1，赋值并不会改变引用本身，使用函数别名调用时，
// bar 虽然是 obj.foo 的一个引用，但是实际上引用的还是 foo 函数本身，
```

2. 函数作为参数传递时
```js
function bar(fn) {
	fn(); // <-- 调用位置
}

bar(obj.foo); // 1, 参数传递也是一种隐式赋值，即使传入的是函数，这里相当于 fn = obj.foo，所以 fn 实际上引用的还是 foo 函数本身，this 应用默认绑定
```

3. this 指向绑定事件的元素。注意它和 target 的区别，target 是指向触发事件的元素

## 显式绑定

我们知道 `call`，`apply`，`bind` 等方法可以改变 `this` 的指向

`apply`: apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入，且当第一个参数为null、undefined的时候，默认指向window(在浏览器中)，使用apply方法改变this指向后原函数会立即执行，且此方法只是临时改变thi指向一次。

`call`: call方法的第一个参数也是this的指向，后面传入的是一个参数列表（注意和apply传参的区别）。当一个参数为null或undefined的时候，表示指向window（在浏览器中），和apply一样，call也只是临时改变一次this指向，并立即执行。

<script setup>
import q1Code from './questions/q1.js?raw';
import q2Code from './questions/q2.js?raw';
import q3Code from './questions/q3.js?raw';
import q4Code from './questions/q4.js?raw';
import q5Code from './questions/q5.js?raw';
import apply from './questions/apply.js?raw';
import call from './questions/call.js?raw';
import bind from './questions/bind.js?raw';
</script>

<run-script :code="q4Code">
</run-script>


## 箭头函数
箭头函数的 this 指向始终为外层的作用域。简单来说，箭头函数的 `this` 就是它**外面第一个不是箭头函数的函数的 this**.

> js箭头函数本质上是一个匿名函数表达式，其内this的指向是对应语句在创建执行上下文时确定的，而不是在调用时确定的

<run-script :code="q5Code">
</run-script>

## 实现绑定this的方法

<run-script name="手写apply" :code="apply">
</run-script>

<run-script name="手写call" :code="call">
</run-script>

<run-script name="手写bind" :code="bind">
</run-script>

## 面试题

<run-script :code="q1Code">
</run-script>

<run-script :code="q2Code">
</run-script>

<run-script :code="q3Code">
</run-script>

手写 call、apply、bind