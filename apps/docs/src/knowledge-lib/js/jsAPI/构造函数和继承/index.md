# 构造函数和继承
> 通过 `new` 函数名 来实例化对象的函数叫 `构造函数`。

任何的函数都可以作为构造函数存在。之所以有构造函数与普通函数之分，主要从功能上进行区别的，构造函数的主要功能为**初始化对象，特点是和 new 一起使用**。 

new 就是在创建对象，从无到有，构造函数就是在为初始化的对象添加属性和方法。构造函数定义时**首字母大写**（规范）。

## 一个新对象的过程，发生了什么

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c8bfe229254f669ac66ac1ae37d279~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

- 创建一个空对象
- 空对象的`_proto_`指向了构造函数的`prototype`
- 使用`apply`调用构造器函数，属性和方法被添加到 `this`引用的对象中
- 如果构造函数中没有返回其它对象，那么返回新创建的对象，否则，返回构造函数的结果

<script setup>
import f1 from './src/f1.js?raw';
import f3 from './src/f3.js?raw';
import myNew from './src/myNew.js?raw';
import q from './src/q.js?raw';
</script>


<run-script name="实现new" :code="myNew"></run-script>

## 构造函数上的方法

- 在构造函数上直接定义方法（不共享，不推荐）

```js
function Person() {
	this.say = function () {
		// 直接定义方法
		console.log("hello");
	};
}

let p1 = new Person();
let p2 = new Person();
p1.say(); // hello
p2.say(); // hello

console.log(p1.say === p2.say); // false
```

很明显，p1 和 p2 指向的不是一个地方。 所以 在构造函数上通过 this 来添加方法的方式来生成实例，**每次生成实例，都是`新开辟一个内存空间`存方法**。这样会导致内存的极大浪费，从而`影响性能`。

- 通过原型添加方法（共享）

```js
function Person(name) {
	this.name = name;
}
Person.prototype.say = function () {
	// 通过原型添加方法
	console.log("hello " + this.name);
};

let p1 = new Person("张三");
let p2 = new Person("李四");
p1.say(); // hello 张三
p2.say(); // hello 李四

console.log(p1.say === p2.say); // true
```

**`将私有属性定义到构造函数里，将公共方法放到原型对象上`**

## Javascript 如何实现继承

1. 组合继承
- 通过借用构造函数来实现对实例属性的继承（`Parent.call(this,hello)`）
- 通过使用原型链实现对原型属性和方法的继承（`Child.prototype = new Parent()`）
- 缺点：
  - 调用了两次父类构造函数 Person（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
  - 父子构造函数的原型对象之间有共享问题

<run-script :code="f1"></run-script>

2. 类继承

<run-script :code="f3"></run-script>

<run-script name="类的函数实现细节" :code="q"></run-script>
