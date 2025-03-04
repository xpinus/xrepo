# js机制-编译与执行
我们知道 JavaScript 属于解释型语言，JavaScript 的执行分为：解释和执行两个阶段，这两个阶段所做的事并不一样。

解释阶段
- 词法分析
- 语法分析
- 作用域规则确定

执行阶段
- 创建执行上下文
- 执行函数代码
- 垃圾回收

## 执行栈和执行上下文

### 执行上下文
> 面试题：什么是执行上下文? 谈谈你对 JavaScript 执行上下文栈理解

执行上下文(Execution Context)就是**代码执行前进行的准备工作**

当js执行时，当进入到一个环境，就会创建一个执行上下文

**js中的执行环境与执行上下文**
- 全局环境 -- 全局执行上下文
- 函数环境 -- 函数执行上下文
- eval环境 -- eval执行上下文
  - 安全问题，性能问题，限制引擎优化

**执行上下文的生命周期**
- 创建阶段：函数被调用时，进入函数环境，创建一个函数上下文
  - 函数环境会**创建变量对象**`VO, Variable Object`
    - arguments 对象（并赋值）
    - 函数声明（并赋值）
    - 变量声明，变量表达式声明（**不赋值**）
  - **确定 this 指向**（由调用者决定）
  - **确定作用域**
- 执行阶段：变量赋值、函数表达式赋值

组成：
- 变量环境（Variable Environment）：包含所有变量和函数声明的一个环境。与词法环境类似。
- 词法环境（Lexical Environment）：包括变量、函数以及执行上下文的外部环境。在 ES6 中，词法环境不仅包含了变量和函数，还涉及到 let、const 等块级作用域的处理。
  - 词法环境包括了当前作用域内的所有变量和函数的定义。
  - 它还包含一个指向外部词法环境的引用（也就是作用域链的实现）。

[参考](https://gitee.com/dev-edu/frontend-interview-javascript/blob/master/07.%20%E6%89%A7%E8%A1%8C%E6%A0%88%E5%92%8C%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87/%E6%89%A7%E8%A1%8C%E6%A0%88%E5%92%8C%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87.md)

### 执行栈
> js用来管理不同执行上下文的方式

- 执行栈：先进后出
- 栈底永远是全局执行上下文，栈顶永远是正在执行函数的执行上下文
- 当进入一个执行环境，就会创建出它的执行上下文，然后进行压栈
- 数量限制：没有具体限制，但当栈溢出时会报错`maxmum call stack exceeded`

## 作用域和作用域链

- 规定变量和函数的可访问性的范围称作**作用域**
  - 全局作用域：在代码任何位置都能访问到
  - 函数作用域：函数内部
  - 块级作用域，es6新增
- 查找变量或者函数时，需要从局部作用域到全局作用域依次查找，这些作用域的集合称作**作用域链** 
  - 自由变量的取值: **创建时**作用域链中最靠近的那个变量的取值


> 面试题：什么是作用域

ES5 中只存在两种作用域：全局作用域和函数作用域。

在 JavaScript 中，我们将作用域定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套子作用域中根据标识符名称进行变量（变量名或者函数名）查找。ES6 新增了块级作用域。

> 面试题：什么是作用域链 ？

当访问一个变量时，编译器在执行这段代码时，会首先从当前的作用域中查找是否有这个标识符，如果没有找到，就会去父作用域查找，如果父作用域还没找到继续向上查找，直到全局作用域为止。

而作用域链，就是有当前作用域与上层作用域的一系列变量对象组成，它保证了当前执行的作用域对符合访问权限的变量和函数的有序访问。

作用域链有一个非常重要的特性，那就是作用域中的值是在函数创建的时候，就已经被存储了，是静态的。

所谓静态，就是说作用域中的值一旦被确定了，永远不会变。**函数可以永远不被调用，但是作用域中的值在函数创建的时候就已经被写入了，**并且存储在函数作用域链对象里面。

> 作用域与执行上下文的区别

JavaScript 解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。

执行上下文最明显的就是 this 的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。

**执行上下文在运行时确定，随时可能改变，作用域在定义时就确定，并且不会改变**

> js的作用域是动态还是静态的

JavaScript 的作用域是 **静态作用域**
- 静态作用域是指在代码编写时（词法分析阶段）就确定了变量的作用域，而不是在代码运行时动态确定。
- 函数的作用域在函数定义时就已经确定，而不是在函数调用时确定。
- 变量的查找规则是基于代码的嵌套结构（词法环境），而不是调用栈。

```js
const food = "rice";
const eat = function () {
    console.log(`eat ${food}`);
};
(function () {
    const food = "noodle";
    eat(); // eat rice
})();
```

## 变量提升和预编译

JS属于解释型语言，在执行过程中顺序执行，但是会分块先预编译然后才执行。因此在JS中存在一种变量提升的现象。

- 对于一个let声明的变量，它的创建会被提升，但是初始化和赋值不会被提升。
- 对于一个var声明的变量，它的创建和初始化会被提升，赋值不会被提升。
- 对于一个函数，它的创建，初始化和赋值在同一时间都被提升

> 变量和函数怎么进行提升的？优先级是怎么样的？

- 对所有函数声明进行提升（除了函数表达式和箭头函数） 
- 引用类型的赋值 
- 开辟堆空间 
- 存储内容 
- 将地址赋给变量 
- 对变量进行提升，只声明，不赋值，值为 undefined

https://juejin.cn/post/6844903575571677198