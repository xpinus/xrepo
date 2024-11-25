---
sort: 4
---

# 构造函数和继承

通过 new 函数名 来实例化对象的函数叫 构造函数。
任何的函数都可以作为构造函数存在。之所以有构造函数与普通函数之分，主要从功能上进行区别的，构造函数的主要 功能为**初始化对象，特点是和 new 一起使用**。new 就是在创建对象，从无到有，构造函数就是在为初始化的对象添加属性和方法。构造函数定义时**首字母大写**（规范）。

## 一个新对象的过程，发生了什么

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c8bfe229254f669ac66ac1ae37d279~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

- 创建一个空对象`obj {}`
- 空对象的`_proto_`指向了构造函数的`prototype`成员对象
- 使用`apply`调用构造器函数，属性和方法被添加到 `this `引用的对象中
- 如果构造函数中没有返回其它对象，那么返回 this，即创建的这个的新对象，否则，返回构造函数中返回的对象
- new 申请内存, 创建对象,当调用 new 时，后台会隐式执行`new Object()`创建对象。所以，通过 new 创建的字符串、数字是引用类型，而是非值类型。

### 2 构造函数上的方法

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

## Javascript 如何实现继承？

```js
// 已有父类
function Person(name) {
	this.name = name;
	this.showName = function () {
		return this.name;
	};
}
// 原型对象上添加属性
Person.prototype.age = 18;
Person.prototype.friends = ["小明", "小强"];
```

### 1 构造函数继承（call 和 apply）

利用`call apply`改变`this`指向

```js
// 用法1 内部让父构造调用call，可以传参
function Student(name) {
	Person.call(this, name);
	// Person.apply(this, [name]);  apply的参数传递必须放在一个数组中
}

// 用法2 父类实例使用call改变this
function Student(name) {
	this.name = name;
}
var s1 = new Person("张三");
var s2 = new Student("李四");
console.log(s1.showName.call(s2)); // 李四
// console.log(s1.showName.apply(s2));
```

- 优点：

  - 创建子类实例时可以向父类传参
  - 可以实现多重继承，即子类中有多个父类调用 call

- 缺点：

  - 实例并不是父类实例，只有子类的实例

  - 只能继承父类的实例属性和方法，不能继承其原型属性/方法

  - 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

  - ```js
    function Student(name) {
    	Person.call(this, name);
    	// Person.apply(this, [name]);
    }

    let s1 = new Student("小红");
    console.log(s1.name); // 小红

    // 无法继承原型上的属性和方法
    console.log(s1.age); // undefined
    console.log(s1.friends); // undefined
    ```

### 2 原型链继承

```js
function Student(name) {
	this.name = name;
}
Student.prototype = new Person();
// prototype指向实例对象，可以继承Person的构造函数属性和原型对象上的属性
// Student.prototype = Person.prototype;
// 不能继承Person的构造函数属性，只能继承Person原型对象上的属性，还会修改子会影响父
Student.prototype.constructor = Student;

let s1 = new Student("刘一");
console.log(s1.name); // 刘一
console.log(s1.showName()); // 刘一
console.log(s1.age); // 18
console.log(s1.friends); // ["小明", "小强"]

// 父子构造函数的原型对象之间有共享问题（修改子会影响父）
s1.friends.push("小红");
console.log(s1.friends); // ["小明", "小强", "小红"]

let s2 = new Student();
console.log(s2.friends); // ["小明", "小强", "小红"]
```

- 优点：
  - Student 实例可继承父类构造函数（Person）的属性方法和父类原型对象（Person.prototype）上的属性方法
  - 简单，易于实现
- 缺点：
  - Student 实例无法向父类构造函数（Person）传参（组合方式继承中解决）
  - 继承单一，无法实现多继承（组合方式继承中解决）
- 来自原型对象的所有属性被所有实例共享。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！因为是通过 prototype 实现的，显然）

### 3 组合继承

组合式继承是比较常用的一种继承方法，其背后的思路是：

- 通过使用原型链实现对原型属性和方法的继承（`Child.prototype = new Parent()`）
- 通过借用构造函数来实现对实例属性的继承（`Parent.call(this,hello)`）

**优点**：

- 可以继承父类原型上的属性，可以传参，可复用
- 每个新实例引入的构造函数属性是私有的

**缺点**：

- 调用了两次父类构造函数 Person（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
- 父子构造函数的原型对象之间有共享问题（问题依旧）

```js
function Worker(name) {
	Person.call(this, name); // 构造函数继承
}

Worker.prototype = new Person(); // 原型链继承
Worker.prototype.constructor = Worker;

let w1 = new Worker("张三");
console.log(w1.name); // 张三
console.log(w1.showName()); // 张三
console.log(w1.age); // 18
console.log(w1.friends); // ["小明", "小强"]

//一个实例修改了原型属性，另一个实例的原型属性也会被修改
w1.friends.push("李四");
let p1 = new Person();
console.log(p1.friends); // ["小明", "小强", "李四"]
```

### 4 原型式继承

```js
function content(obj) {
	// 先封装一个函数容器，用来输出对象和承载继承的原型
	function Fn() {}
	Fn.prototype = obj; // 修改类的原型为obj, 于是Fn的实例都将继承obj上的方法
	return new Fn();
}

let p1 = content(new Person("李四"));
//上面在ECMAScript5 有了一新的规范写法，Object.create() 效果是一样的
// let p1 = Object.create(new Person('李四'));

console.log(p1.name); // 李四
console.log(p1.showName()); // 李四
console.log(p1.age); // 18
console.log(p1.friends); // ["小明", "小强"]
```

**优点：**

- 类似于复制一个对象，用函数来包装。

**缺点：**

- 所有实例都会继承原型上的属性。

- 无法实现复用。（新实例属性都是后面添加的）

### 5 寄生式继承

```js
function content(obj) {
	function Fn() {}
	Fn.prototype = obj; // 继承了传入的参数
	return new Fn();
}

// 在原型式继承外面 '又' 套了个壳子
function subObj(obj) {
	let sub = content(obj);
	sub.name = "王五";
	return sub;
}

let p1 = subObj(new Person());
console.log(p1.name); // 王五
console.log(p1.showName()); // 王五
console.log(p1.age); // 18
console.log(p1.friends); // // ["小明", "小强"]
```

**优点：**

- 没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。

**缺点：**

- 没用到原型，无法复用。

### 6 寄生组合式继承（ 常用）

```js
function Student(name) {
	Person.call(this, name);
}

// 创建一个没有实例方法的类
let Super = function () {};
Super.prototype = Person.prototype;
//将实例作为子类的原型
Student.prototype = new Super();

let s1 = new Student("赵六");
console.log(s1.name); // 赵六
console.log(s1.showName()); // 赵六
console.log(s1.age); // 18
console.log(s1.friends); // // ["小明", "小强"]
```
