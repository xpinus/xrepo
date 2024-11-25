---
sort: 34
---

# require和import

https://juejin.cn/post/6844904080955932680

`require/exports`
> 在源文件中更改变量的值，通过 require 引入 counts 的变量，拿到的值始终是初始化的值


`import/export`
>通过 import 引入 counts 的变量，在源文件中修改变量的值后，引入拿到的变量值也会改变。


**require和import的区别**

- 导入require 导出 exports/module.exports 是 CommonJS 的标准，通常适用范围如 Node.js
- import/export 是 ES6 的标准，通常适用范围如 React
- require 是赋值过程并且是运行时才执行，也就是同步加载
- require 可以理解为一个全局方法，因为它是一个方法所以意味着可以在任何地方执行。
- import 是解构过程并且是编译时执行，理解为异步加载
- import 会提升到整个模块的头部，具有置顶性，但是建议写在文件的顶部。
- commonjs 输出的，是一个值的拷贝，而es6输出的是值的引用；
- commonjs 是运行时加载，es6是编译时输出接口；

**require和import的性能**
- require 的性能相对于 import 稍低。
因为 require 是在运行时才引入模块并且还赋值给某个变量，而 import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高

**require加载流程**

路径分析 - 文件定位 - 编译执行

参考： https://juejin.cn/post/7056968475834581022