---
sort: 4
---

# 说一下 webpack 的一些 plugin，怎么使用 webpack 对项目进行优化

**构建优化**

- 减少编译体积 `ContextReplacementPugin`、`IgnorePlugin`、`babel-plugin-import`、`babel-plugin-transform-runtime`
- 并行编译 `happypack`、`thread-loader`、`uglifyjsWebpackPlugin`开启并行
- 缓存 `cache-loader`、`hard-source-webpack-plugin`、`uglifyjsWebpackPlugin`开启缓存、`babel-loader`开启缓存
- 预编译 `dllWebpackPlugin && DllReferencePlugin`、`auto-dll-webapck-plugin`

**性能优化**

- 减少编译体积 `Tree-shaking`、`Scope Hositing`
- `hash`缓存 `webpack-md5-plugin`
- 拆包 `splitChunksPlugin`、`import()`、`require.ensure`

**plugin的hooks**

`entryOption`: SyncBailHook 在 entry 配置项处理过之后，执行插件。

`afterPlugins`: SyncHook 在设置完初始插件之后，执行插件。

`afterResolvers`: SyncHook 在resolver安装完成之后，执行插件。

`environment`: SyncHook environment 准备好之后，执行插件。

`afterEnvironment`: SyncHook

`beforeRun`: AsyncSeriesHook compiler.run() 执行之前，添加一个钩子。

`run`: AsyncSeriesHook 开始读取 records 之前，钩入(hook into) compiler。

`watchRun`: AsyncSeriesHook 监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前。

`normalModuleFactory`: SyncHook NormalModuleFactory 创建之后，执行插件。

`contextModuleFactory`: ContextModuleFactory 创建之后，执行插件。

`beforeCompile`: AsyncSeriesHook 编译(compilation)参数创建之后，执行插件。

`compile`: SyncHook 一个新的编译(compilation)创建之后，钩入(hook into) compiler。

`thisCompilation`: SyncHook 触发 compilation 事件之前执行（查看下面的 compilation）。

`compilation`: SyncHook 编译(compilation)创建之后，执行插件。

`make`: AsyncParallelHook

`afterCompile`: AsyncSeriesHook

`shouldEmit` SyncBailHook 此时返回 true/false。

`emit`: AsyncSeriesHook 生成资源到 output 目录之前。

`afterEmit`: AsyncSeriesHook 生成资源到 output 目录之后。

`done`: SyncHook 编译(compilation)完成。

...


**loader和plugin的区别**、
- 两者都是为了扩展webpack的功能。loader它只专注于转化文件（transform）这一个领域，完成压缩，打包，语言翻译; 而plugin不仅只局限在打包，资源的加载上，还可以打包优化和压缩，重新定义环境变量等
- loader运行在打包文件之前（loader为在模块加载时的预处理文件）；plugins在整个编译周期都起作用
- 一个loader的职责是单一的，只需要完成一种转换。一个loader其实就是一个Node.js模块。当需要调用多个loader去转换一个文件时，每个loader会链式的顺序执行
- 在webpack运行的生命周期中会广播出许多事件，plugin会监听这些事件，在合适的时机通过webpack提供的API改变输出结果
