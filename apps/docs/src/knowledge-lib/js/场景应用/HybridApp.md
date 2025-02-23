# 移动端开发必备知识-Hybrid App

https://juejin.cn/post/7062967241268019214

App目前主要分为三类，分为:
- Web App: 移动端网站
- Native App：原生App啦，分为Android开发和IOS开发
- Hybrid App：将 APP 的一部分需要动态变动的内容通过 H5 来实现，通过原生的网页加载控件 WebView (Android)或 WKWebView（iOS）来加载H5页面

## App和H5通信

### H5端调用App端方法

- H5端调用Android端方法使用window.androidJSBridge.方法名(参数)，这里的androidJSBridge名称不固定可自定义。而H5端调用IOS端方法固定写法为window.webkit.messageHandlers.方法名.postMessage(参数)
- H5端调用Android端方法传递的参数只能是基本数据类型，如果需要传递引用数据类型需要使用JSON.stringfy()处理。而IOS端既可以传递基本数据类型也可以传递引用数据类型。
- H5端调用Android端方法可以直接有返回值。而IOS端不能直接有返回值。
