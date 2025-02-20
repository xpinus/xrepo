# 前端构建知识体系

## 脚手架和构建工具

> 构建工具：将代码从开发环境构建到生产环境

1. 第一代构建工具：以 npm scripts、grunt、gulp 为代表的构建工具，这一代构建工具所做的事情主要就是编译、合并以及压缩等工作。
2. 第二代构建工具：以 browserify、webpack、parcel、rollup 为代表的构建工具。这一代构建工具加强了对模块的处理，能够对模块的依赖关系进行处理，对模块进行合并打包。
3. 第三代构建工具：主要就是往“锈化”的方向发展。就是使用 Rust 将前端工具链重构
- Babel ---> swc
- PostCSS ---> lightingCSS
- Electron ---> Tauri
- ESLint ----> dprint
- Webpack ---> Turbopack、Rspack
- rollup ---> rolldown

> 脚手架：帮助开发者搭建开发环境项目的工具，但是现代脚手架往往内置构建工具
- VueCLI：内置了 webpack 作为构建工具
- CreateReactApp：内置了 webpack 作为构建工具

[从零到亿系统性的建立前端构建知识体系](https://juejin.cn/post/7147365025047379981/)

## 模块化原理

> 模块化的产生是为了解决什么问题？在什么场景下诞生的？

- 早期js开发存在`全局污染`和`依赖混乱`的问题
- 社区模块化方案
  - CommonJS
      - 最初由社区提出用在浏览器器之外，如node服务端，在node中`每一个js都是一个单独模块`
      - 使用`exports`、`module.exports`、`require`
      - 运行时
  - AMD CMD UMD 为浏览器环境提出的模块化方案
- ES6官方提出的模块化方案`ES Module`
    - 使用import export
    - 静态导入导出的优势，实现了 tree shaking
    - 可以 import() 懒加载方式实现代码分割

浏览器是仅支持ESM，node支持CJS\ESM，构建工具支持更多, 如 Webpack 搭建的项目中，它是允许我们使用各种各样的模块化的。最常用的方式就是 CommonJS 和 ES Module。

> [import和require的区别](https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)
- 出现的时间、地点(官方、社区)不同
- 浏览器服务器支持情况不同
  - 原生浏览器不支持 require/exports，可使用支持 CommonJS 模块规范的 Browsersify、webpack 等打包工具，它们会将 require/exports 转换成能在浏览器使用的代码。
  - import/export 在浏览器中无法直接使用，我们需要在引入模块的 <script> 元素上添加type="module" 属性。
  - 即使 Node.js 13.2+ 可以通过修改文件后缀为 .mjs 来支持 ES6 模块 import/export，但是Node.js 官方不建议在正式环境使用。目前可以使用 babel 将 ES6 的模块系统编译成 CommonJS 规范
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

**那这些打包工具是如何实现模块化的呢？**
### [webpack实现方式](./webpack/构建体系01-webpack模块化原理)
### [webpack懒加载原理](./webpack/构建体系02-webpack懒加载原理)

> [!TIP]
> vite的实现方式？

## [AST(抽象语法树)](./AST)

Ajax Interceptor : 一个谷歌插件，可以拦截页面上的 Ajax 请求，并把返回结果替换成任意文本。这对 mock 数据、排查线上问题 来说简直就是神器

chrome支持直接在线上环境添加 source-map 链接来定位问题

- 环境、api兼容、语法兼容怎么处理
- 什么是syntax transformer runtime
- 什么是AST
- 厂商前缀、代码压缩、代码剪枝
- webpack模块化查找规则
- 热更新
- 源码地图在做什么

