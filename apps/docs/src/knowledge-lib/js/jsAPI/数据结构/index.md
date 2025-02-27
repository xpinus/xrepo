# 数据类型和数据结构
> ES中数据的分类分为基本数据类型和引用数据类型

<script setup>
import q1 from './src/q1.js?raw';
import q2 from './src/q2.js?raw';
import q3 from './src/q3.js?raw';
import MySet from './src/MySet?raw';
import MyMap from './src/MyMap?raw';
import myInstanceof from './src/myInstanceof?raw';
</script>


[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8A%A8%E6%80%81%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%BC%B1%E7%B1%BB%E5%9E%8B)

## 原始值
> 除了 Object 以外，所有的类型都定义了不可变的、在语言最底层直接表示的值。我们将这些类型的值称为原始值。

> 原始值是不可变的——一旦创建了原始值，它就不能被改变，尽管持有它的变量可以被重新分配另一个值

> 除了 null 以外，所有的原始类型都可以使用 typeof 运算符进行测试。typeof null 返回 "object"，因此必须使用 === null 来测试 null

`Null` `Undefiend` `Boolean` `Number` `String` `Symbol` `BigInt` 

### null和undefined
- 从概念上讲，undefined 表示值缺失，null 表示对象缺失（这也解释了 typeof null === "object"）。当某些东西没有值时，JavaScript 语言通常默认为 undefined
- null最重要的地方是原型链的末端，其次是与原型交互的方法，如 Object.getPrototypeOf()、Object.create() 等
- null 是一个关键字，但 undefined 是一个普通的标识符，可以被重新赋值，这个标识符恰好是一个全局属性。

### Number
- 基于 IEEE 754 标准的双精度 64 位二进制格式的值
- 表示范围
  - 存储 2^-1074`Number.MIN_VALUE`和 2^1023 × (2 - 2^-52)`Number.MAX_VALUE`之间的正浮点数，以及相同范围的负浮点数，
  - 仅能安全地存储在 -(2^53 − 1)`Number.MIN_SAFE_INTEGER`到 2^53 − 1`Number.MAX_SAFE_INTEGER`范围内的整数。超出这个范围，JavaScript 将不能安全地表示整数；相反，它们将由双精度浮点近似值表示。
  - 以使用 Number.isSafeInteger() 检查一个数是否在安全的整数范围内
  - 超出范围会转换为 Infinity 或 -Infinity 或 +0 或 -0
- NaN（“Not a Number”）是一个特殊种类的数字值，当算术运算的结果不能表示为数字时，通常会遇到它。它也是 JavaScript 中唯一不等于自身的值。

### Symbol
symbol 是一种基本数据类型（primitive data type）。Symbol() 函数会返回 symbol 类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的 symbol 注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。

每个从 Symbol() 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。更进一步的解析见—— glossary entry for Symbol。

> 有哪些内置的symbol

### 包装类型
> `Boolean` `Number` `String`有对应的`对象包装类型`，它们为处理原始值提供了有用的方法。当在原始值上访问属性时，JavaScript 会自动将值包装成对应的包装对象，并访问对象上的属性。
1. 自动创建一个对应的包装类型的实例
2. 调用实例上的方法
3. 销毁实例

<run-script name="下列代码运行结果，解释一下" :code="q2"></run-script>

## Object
> 在 JavaScript 中，对象可以被看作是一个属性的集合

> 属性键要么是字符串，要么是 symbol, 当其他类型（如数字）用于索引对象时，值会隐式地转化为字符串

> 有两种类型的对象属性：数据属性和访问器属性。每个属性都有对应的特性。
> 每个特性由 JavaScript 引擎进行内部访问
> 通过 `Object.defineProperty()` 设置它们，或通过 `Object.getOwnPropertyDescriptor()` 读取它们

### 数据属性
> 数据属性将键与值相关联
- value: 数据属性的值, 通过属性的 get 访问获取值 
- writable: 属性值是否可写
- enumerable: 是否可枚举
- configurable: 数据属性是否可配置, 表示属性是否可以删除，是否可以更改为访问器属性，以及是否可以更改其特性

### 访问器属性
> 数据属性的属性描述符中，如果配置了get和set，那么就是访问器属性
> get和set配置均为函数，如果一个属性时访问器属性，则读取该属性时，会运行get方法，将返回值作为属性值，如果有set方法，则会运行set方法，将值作为新值，然后返回新值

> 对象的原型指向另一个对象或者 null——从概念上讲，它是对象的隐藏属性，通常表示为 [[Prototype]]。对象的 [[Prototype]] 的属性也可以在对象自身上访问。

- get
- set
- enumerable
- configurable

### Set和Map

#### Set
> 集合（set）中的元素只会出现一次，即集合中的元素是唯一的。
- `new Set()`: 接收参数为一个可迭代对象
- 值的相等是基于`零值相等算法`

<run-script name="手写Set" :code="MySet"></run-script>

#### Map

<run-script  name="手写Map" :code="MyMap"></run-script>

#### WeakMap和WeakSet
> WeakMap 和 WeakSet 只允许将可垃圾回收的值作为键，这些键要么是对象，要么是未注册的 symbol，即使键仍在集合中，也可能被回收。它们专门用于优化内存使用。

## 面试题

> JavaScript 中的数据类型有哪些？及各个数据类型是如何存储的?

- 基本数据类型有： Number； String；Boolean；Null；Undefined；Symbol； bigInt；
  - 基本数据类型的数据直接存储在栈中；
  - 栈内存是自动分配和释放的，因为栈的内存管理由运行时环境负责，当函数调用结束时，相关的栈内存会被自动释放；

- 引用数据类型统称为 Object 类型，细分的话有 Object；Array；Date；Function；RegExp等；
  - 引用数据类型的数据存储在堆中，在栈中保存的是数据的引用地址
  - 堆内存是动态分配内存的，不会自动释放，而是由JavaScript的垃圾回收机制自动管理的

> 在 JS 中为什么 0.2+0.1>0.3?

因为在 JS 中，浮点数是使用 64 位固定长度来表示的，其中的 1 位表示符号位，11 位 用来表示指数位，剩下的 52 位尾数位，由于只有 52 位表示尾数位。

**为什么不等于0.3**
因为如0.1转为二进制是一个无限循环数,把它存到内存中再取出来转换成十进制就不是原来的0.1了,出现精度缺失。

**为什么大于**
0.1 和 0.2 都转化成二进制后再进行运算，运算结果再转换为十进制，进度误差导致大于 0.3。

**那既然 0.1 不是 0.1 了，为什么在 console.log(0.1)的时候还是 0.1 呢**
1. JavaScript 会自动将浮点数的二进制近似值转换回十进制并显示。
2. console.log() 对输出的浮点数进行了格式化处理，它展示的是一个易于理解的结果，即最接近的十进制表示

> toFixed() 方法在遇到5的时候怎么有时进位有时舍弃？

精度问题， 可以用Number.toPresision(20)验证

> 判断数据类型的几种方法
- `Object.prototype.toString.call()`: 返回数据类型的字符串
  - 可以区分 null 、 string 、boolean 、 number 、 undefined 、 array 、 function 、 object 、 date 、 math 数据类型
  - 缺点：不能细分为谁谁的实例
```js
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call({}); // '[object Object]'
Object.prototype.toString.call(10); // '[object Number]'
Object.prototype.toString.call('10'); // '[object String]'
Object.prototype.toString.call(true); // '[object Boolean]'
Object.prototype.toString.call(undefined); // '[object Undefined]'
Object.prototype.toString.call(null); // '[object Null]'
```
- `typeof`: 返回数据类型的字符串
  - 缺点：typeof null 的值为 Object，无法分辨是 null 还是 Object
    - 为在 JavaScript 中，不同的对象都是使用二进制存储的，如果二进制前三位都是 0 的话，系统会判断为是 Object 类型，而 null 的二进制全是 0
    - 000对象 001整型 010浮点数 100字符串 110布尔值
```js
typeof undefined // 'undefined' 
typeof '10' // 'String' 
typeof 10 // 'Number' 
typeof false // 'Boolean' 
typeof Symbol() // 'Symbol' 
typeof Function // ‘function' 
typeof null // ‘Object’ 
typeof [] // 'Object' 
typeof {} // 'Object
```
- `instanceof`: 返回 true 或者 false
  - 缺点：只能判断对象是否存在于目标对象的原型链上
<run-script name="手写instaceof" :code="myInstanceof"></run-script>
- `constructor.name`: 返回数据类型的构造函数的名称
```js
var d = new Number(1) 
var e = 1
function fn() { console.log("ming"); }
var date = new Date(); 
var arr = [1, 2, 3]; 
var reg = /[hbc]at/gi; 
console.log(e.constructor);//ƒ Number() { [native code] } 
console.log(e.constructor.name);//Number 
console.log(fn.constructor.name) // Function 
console.log(date.constructor.name)// Date 
console.log(arr.constructor.name) // Array
```

## 面试题
 
<run-script :code="q1"></run-script>

> typeof String(1) 和 typeof new String(1)
> 返回值的区别？
> 为什么都能调用substr方法

<run-script :code="q3"></run-script>