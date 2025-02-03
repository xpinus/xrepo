# ES6

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

- 变量提升
  - var声明的变量存在变量提升，即变量可以在声明之前调用，值为undefined 
  - let和const不存在变量声明提升，即它们所声明的变量一定要在声明后使用，否则报错未初始化
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
let sayHi = () => {
console.log('Hello World !')
};
console.log(sayHi.prototype); // undefined

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

### 迭代器和生成器


### 运算符

- 算数运算符
  - 加法运算符:+
    - 如果有字符串作字符串拼接
    - 转换成数字运算
  - %余数：结果的正负号由第一个运算数决定
  - 指数运算符：** 右结合
  - NaN 在作比较结果一定是false, 计算时结果一定是NaN