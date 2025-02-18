# 浏览器

## 浏览器的组成

- 用户界面 user interface：用于呈现浏览器窗口的部件
- 浏览器引擎 browser engine：UI和渲染引擎之间的桥梁
- 渲染引擎 render engine：负责渲染页面 
- 网络 networking
- js解释器 javascript interpreter
- 用户界面后端 UI backend：绘制操作系统提供的小部件，如下拉列表、文本框、按钮等
- 数据存储 data storage：用户数据保存到磁盘中

> 常见的浏览器内核有哪些？

主流浏览器：1、IE浏览器（Internet explorer）2、火狐浏览器（Firefox）3、谷歌浏览器（Chrome）4、苹果浏览器（Safari）5、欧朋浏览器（Opera）

四大主流内核：

- **Trident**: IE
- **Gecko**: Firefox
- **Webkit** : Safari和Chrome旧版
- **Blink**： Chrome和Opera

https://www.cnblogs.com/moon-lee/p/12359183.html

从渲染看内核：https://zhuanlan.zhihu.com/p/388472648

## 文件下载
> 服务器只要设置响应头`Content-Disposition: attachment; filename="xxx"`即可自动触发浏览器的下载功能

