# qiankun 

**qiankun(乾坤)**是由蚂蚁金服推出的基于Single-Spa实现的前端微服务框架，它提供了更加开箱即用的 API，做到了技术栈无关，接入十分简单。
- [乾坤(qiankun)实现沙箱机制，看这篇就够了](https://juejin.cn/post/7431455846150242354?searchId=202502192140290596B8A52033D170D738)
- [深入调研了微前端，还是iframe最香](https://juejin.cn/post/7244070072788287544?searchId=202502192140290596B8A52033D170D738)
- 技术栈无关
- 独立开发、独立部署
- 增量升级
- 独立运行时

**微前端概念**
> 微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。

> 微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。


qiankun基于single-spa进行了二次开发

主应用：只需要输入子应用的html入口

子应用：与single-spa基本一致，导出了三个生命周期函数。

js隔离

Proxy沙箱，它将window上的所有属性遍历拷贝生成一个新的fakeWindow对象，紧接着使用proxy代理这个fakeWindow，用户对window操作全部被拦截下来，只作用于在这个fakeWindow之上

css隔离

ShadowDOM样式沙箱会被开启。在这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响。
Scoped CSS，qiankun会遍历子应用中所有的CSS选择器，通过对选择器前缀添加一个固定的带有该子应用标识的属性选择器的方式来限制其生效范围，从而避免子应用间、主应用与子应用的样式相互污染。
但如果用户在运行时引入了新的外联样式或者自行创建了新的内联标签，那么qiankun并不会做出反应

qiankun在框架内部预先设计实现了完善的发布订阅模式

📦 基于 single-spa 封装，提供了更加开箱即用的 API。
📱 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
💪 HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
🛡​ 样式隔离，确保微应用之间样式互相不干扰。
🧳 JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
⚡️ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。
🔌 umi 插件，提供了 @umijs/plugin-qiankun 供 umi 应用一键切换成微前端架构系统。

[Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

## 基础使用

https://qiankun.umijs.org/zh/guide/getting-started

https://juejin.cn/post/7121515637624537119

1. 设置基座
```js
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    /**
     * name: 子应用名称 - 子应用之间必须确保唯一
     * entry: 子应用入口 - 通过该地址加载微应用
     * container: 子应用挂载节点 - 子应用加载完成后将挂载在该节点上
     * activeRule: 子应用触发的路由规则 - 触发路由规则后将加载该子应用
     */
     // {}
]);

start();
```

2. 子应用配置

导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用