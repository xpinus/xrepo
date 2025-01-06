# Webpack异步加载(懒加载)原理
> 懒加载的本质是代码分离，在一些逻辑断点处分离代码，加快初始应用的加载速度

[【Webpack】异步加载(懒加载)原理](https://juejin.cn/post/7152516872330543141/)

在Webpack搭建的项目中，如何达到懒加载的效果？
在Webpack中常用的代码分割方式有哪些？
Webpack中懒加载的原理是什么？

在Webpack中常用的代码分离方法有三种：
- 入口起点：使用`entry`配置手动地分离代码。
- 防止重复：使用`Entry dependencies`或者`SplitChunksPlugin`去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码，主要是`import()`语法
  - 在代码中所有被 import() 的模块，都将打成一个单独的模块，放在 chunk 存储的目录下。在浏览器运行到这一行代码时，就会自动请求这个资源，实现异步加载
  - 常见使用场景：路由懒加载


> 对于原始代码
```js
// main.js
const buttonEle = document.getElementById("button");

buttonEle.onclick = function () {
    import("./test").then((module) => {
        const print = module.default;
        print();
    });
};


// test.js
export default () => {
    console.log("按钮点击了");
};
```

> 编译后
```js
// main.js
const buttonEle = document.getElementById("button");
buttonEle.onclick = function () {
    // 当点击按钮时，先通过 jsonp 的方式去加载 test.js 模块所对应的文件
    // 加载回来后在浏览器中执行此JS脚本，将请求过来的模块定义合并到 main.js 中的 modules 中去
    require.e("src_test_js") // src_test_js是打包时生成的chunkName
        // 合并完后，去加载这个模块
        // 这个bind可以理解为：快速生成then的回调函数，不是更改指针用的
        .then(require.bind(require, './src/test.js'))
        .then((module) => {
            // 拿到该模块导出的内容
            const print = module.default;
            print();
        })
};



// test.js
// jsonp的思想，触发页面已有的函数，添加数据
self["webpackChunkstudy"].push([
  ["src_test_js"],
  {
    "./src/test.js": (modules, exports, require) => {
      require.defineProperty(exports, {
        default: () => WEBPACK_DEFAULT_EXPORT,
      });
      const WEBPACK_DEFAULT_EXPORT = () => {
        console.log("按钮点击了");
      };
    },
  },
]);
```

> [!TIP]
> 先看 [webpack模块化原理]('./构建体系01-webpack模块化原理.md) 
```js
//初始化：默认情况下这里放的是同步代码块，这里的demo因为没有同步代码，所以是一个空的模块对象
var modules = {};

// 缓存，已经加载过的模块
var cache = {};

//相当于在浏览器中用于加载模块的polyfill
function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (cache[moduleId] = {
    exports: {},
  });
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

require.defineProperty = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key],
    });
  }
};

//已经安装好的代码块，main.js就是对应的main代码块，0表示已经加载成功，已经就绪
var installedChunks = {
  main: 0,
};

require.publicPath = ""; //output中的publicPath属性

require.j = function (chunkId, promises) {
  var promise = new Promise((resolve, reject) => {
    installedChunks[chunkId] = [resolve, reject];
  });
  promises.push(promise);
  
  // 创建script元素自动请求
  var url = require.publicPath + chunkId + ".main.js";
  let script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
};

// 被返回的脚本调用
function webpackJsonpCallback([chunkIds, moreModules]) {
  const resolves = [];
  for (let i = 0; i < chunkIds.length; i++) {
    const chunkId = chunkIds[i];
    resolves.push(installedChunks[chunkId][0]);
    installedChunks[chunkId] = 0; // 标识一下代码已经加载完成了
  }

  for (const moduleId in moreModules) {
    modules[moduleId] = moreModules[moduleId]; // 合并modules
  }

  while (resolves.length) {
    resolves.shift()();   // 结束 require.j 添加的 promise
  }
}
self.webpackChunkstudy = {};
self.webpackChunkstudy.push = webpackJsonpCallback;

require.e = function (chunkId) {
  let promises = [];
  require.j(chunkId, promises);
  return Promise.all(promises);
};
```



