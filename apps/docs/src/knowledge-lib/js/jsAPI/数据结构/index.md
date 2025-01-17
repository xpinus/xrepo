# 数据类型和数据结构

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8A%A8%E6%80%81%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%BC%B1%E7%B1%BB%E5%9E%8B)

## 原始值
> 除了 Object 以外，所有的类型都定义了不可变的、在语言最底层直接表示的值。我们将这些类型的值称为原始值。

> 原始值是不可变的——一旦创建了原始值，它就不能被改变，尽管持有它的变量可以被重新分配另一个值

> 除了 null 以外，所有的原始类型都可以使用 typeof 运算符进行测试。typeof null 返回 "object"，因此必须使用 === null 来测试 null

> 除了 null 和 undefined 以外，所有的原始类型都有对应的`对象包装类型`，它们为处理原始值提供了有用的方法。当在原始值上访问属性时，JavaScript 会自动将值包装成对应的包装对象，并访问对象上的属性。

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

## Object
> 在 JavaScript 中，对象可以被看作是一个属性的集合

> 属性键要么是字符串，要么是 symbol, 当其他类型（如数字）用于索引对象时，值会隐式地转化为字符串

> 有两种类型的对象属性：数据属性和访问器属性。每个属性都有对应的特性。每个特性由 JavaScript 引擎进行内部访问，但是你可以通过 Object.defineProperty() 设置它们，或通过 Object.getOwnPropertyDescriptor() 读取它们

### 数据属性
> 数据属性将键与值相关联
- value: 数据属性的值, 通过属性的 get 访问获取值
- writable: 是否可写
- enumerable: 是否可枚举
- configurable: 是否可配置, 表示属性是否可以删除，是否可以更改为访问器属性，以及是否可以更改其特性

### 访问器属性
> 将键与两个访问器函数（get 和 set）相关联，以获取或者存储值。

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

<run-script  codePath="knowledge-lib/js/jsAPI/Map和Set/MySet.js"></run-script>

#### Map

#### WeakMap和WeakSet
> WeakMap 和 WeakSet 只允许将可垃圾回收的值作为键，这些键要么是对象，要么是未注册的 symbol，即使键仍在集合中，也可能被回收。它们专门用于优化内存使用。


