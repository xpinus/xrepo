## 打包体积 优化思路

- 提取第三方库或通过引用外部文件的方式引入第三方库
- 代码压缩插件`UglifyJsPlugin`
- 服务器启用 gzip 压缩
- 按需加载资源文件 `require.ensure`
- 优化`devtool`中的`source-map`
- 剥离`css`文件，单独打包
- 去除不必要插件，通常就是开发环境与生产环境用同一套配置文件导致

https://www.jianshu.com/p/6b526cc31ba7

## 打包效率

- 开发环境采用增量构建，启用热更新
- 开发环境不做无意义的工作如提取`css`计算文件 hash 等
- 配置`devtool`
- 选择合适的`loader`
- 个别`loader`开启`cache` 如`babel-loader`
- 第三方库采用引入方式
- 提取公共代码
- 优化构建时的搜索路径 指明需要构建目录及不需要构建目录
- 模块化引入需要的部分


## Loader

编写一个 loader

> ```
> loader`就是一个`node`模块，它输出了一个函数。当某种资源需要用这个`loader`转换时，这个函数会被调用。并且，这个函数可以通过提供给它的`this`上下文访问`Loader API`。 `reverse-txt-loader
> ```

```js
// 定义
module.exports = function(src) {
  //src是原文件内容（abcde），下面对内容进行处理，这里是反转
  var result = src.split('').reverse().join('');
  //返回JavaScript源码，必须是String或者Buffer
  return `module.exports = '${result}'`;
}
//使用
{
	test: /\.txt$/,
	use: [
		{
			'./path/reverse-txt-loader'
		}
	]
}
```

## plugin，怎么使用 webpack 对项目进行优化

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

## 模块化原理

**构建优化**

https://juejin.cn/post/6923991709667819534

https://juejin.cn/post/6844904109775028238

## 打包流程和基本实现

![](https://pic3.zhimg.com/80/v2-658430a76ce1ea9c21ff37ce2006723a_720w.png)

参考1：https://zhuanlan.zhihu.com/p/101541041

参考2：https://zhuanlan.zhihu.com/p/371999555

- webpack 构建流程

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :
- 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
- 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
- 确定入口：根据配置中的 entry 找出所有的入口文件。
- 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
- 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
- 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。


**webpack的打包原理是什么**

webpack打包原理是根据文件间的依赖关系对其进行静态分析，将这些模块按指定规则生成静态资源，当webpack处理程序时，它会递归地构建一个依赖关系图，将所有这些模块打包成一个或多个bundle。

webpack有两种组织模块的依赖方式，同步、异步。异步依赖将作为分割点，形成一个新的块；在优化了依赖树之后，每一个异步区块都将作为一个文件被打包。

webpack有一个智能解析器，几乎可以处理任何第三方库。无论它们的模块形式是CommonJS、AMD还是普通的JS文件；甚至在加载依赖的时候，允许使用动态表require("、/templates/"+name+"、jade")。

要承担如下功能：
打包：将多个文件 打包成 一个文件，减少服务器压力和下载带宽
转换：将预编译语言 转换成 浏览器识别的语言
优化：性能优化

webpack 特点：

**代码拆分**

webpack 有两种组织模块的依赖方式，同步、异步
异步依赖将作为分割点，形成一个新的块；在优化了依赖树之后，每一个异步区块都将作为一个文件被打包

**智能解析**

webpack 有一个智能解析器，几乎可以处理任何第三方库
无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件；甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")

**快速运行**

webpack 使用异步 I/O 、多级缓存提高运行效率，使得 webpack 以难以令人置信的速度 快速增量编译

## vite和webpack的优缺点

https://cloud.tencent.com/developer/article/1952175

webpack:

识别文件入口，逐层解析将代码转换成AST抽象语法树，再转换成浏览器可以识别的代码

冷启动缓慢

热更新效率低下

vite:

利用浏览器会对设置为module的script标签自动请求，并递归请求内部需求的特点，劫持这些请求，直接返回项目中文件，没有打包编译，速度快

Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。使用GO编写的ESBuild.

让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入的代码，即只在当前屏幕上实际使用时才会被处理。

HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失效（大多数时候只需要模块本身），使 HMR 更新始终快速，无论应用的大小。Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

缺点：生态不行，打包用的rollup，esbuild对于js和css代码分割不友好

## 热更新原理

Hot Module Replacement，简称HMR，无需完全刷新整个页面的同时，更新模块。HMR的好处，在日常开发工作中体会颇深：节省宝贵的开发时间、提升开发体验。

详细：https://juejin.cn/post/6844904008432222215

大致流程：
webpack-dev-server：
1.在启动本地服务时，另外开启了websocket用于通知浏览器热更新
2.修改了webpack的entry，添加了而外的一些代码，主要包括浏览器端websocket的程序，接收处理相应
3.HotModuleReplacementPlugin为每个module添加对应的热更新操作函数，做旧模块删除新模块替换
