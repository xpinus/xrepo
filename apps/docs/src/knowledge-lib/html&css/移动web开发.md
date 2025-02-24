# 移动web开发

## 知道 PWA 吗

PWA 全称 Progressive Web App，即渐进式 WEB 应用。一个 PWA 应用首先是一 个网页,可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能

## 移动布局方案方案

- 根据端来开发不同页面
- 根据不同端加载不同css
- 根据响应式，来运行不同的规则样式

考虑问题：
1. 设置视窗
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
2. 掌握媒体查询

|        断点         | 类中缀  | 分辨率 |
|:-----------------:|:----:| :---: |
|      X-Small      | None | <576px | 
|       Small       | sm   | ≥576px |
|      Medium       |  md  | ≥768px |
|      Large        |  lg  | ≥992px |
|    Extra large    |  xl  | ≥1200px |
| Extra extra large | xxl  | ≥1400px |


rem

[参考](https://juejin.cn/post/6953091677838344199#heading-1)

react实践：https://juejin.cn/post/7082386729277718565

> 栅格系统

[参考](https://juejin.cn/post/6953091677838344199#heading-1)


> 大屏适配

https://juejin.cn/post/6972416642600927246

## 移动端适配 1px 的问题

> 原因：

首先，我们了解 devicePixelRatio（DPR）这个东西 在 window 对象中有一个 devicePixelRatio 属性，他可以反应 css 中的像素与设备的 像素比。然而 1px 在不同的移动设备上都等于这个移动设备的 1px，这是因为不同的 移动设备有不同的像素密度。有关这个属性，它的官方的定义为：设备物理像素和设 备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素 1px 变粗的原 因：viewport 的设置和屏幕物理分辨率是按比例而不是相同的. 移动端 window 对象 有个 devicePixelRatio 属性,它表示设备物理像素和 css 像素的比例,在 retina 屏的 iphone 手机上, 这个值为 2 或 3,css 里写的 1px 长度映射到物理像素上就有 2px 或 3px 那么长

> 解决方案
- 用小数来写 px 值 + 媒体查询
```css
.border { border: 1px solid #999 } 
@media screen and (-webkit-min-device-pixel-ratio: 2) { 
    .border { border: 0.5px solid #999 } 
}
@media screen and (-webkit-min-device-pixel-ratio: 3) { 
    .border { border: 0.333333px solid #999 } 
}
```
- 伪元素实现边框 + transform缩放 + 媒体查询

## 移动端兼容性

### touch和click事件的冲突
> 移动设备上的浏览器将会在 click 事件触发时延迟 300ms ，以确保这是一个“单击”事件而非“双击”事件。而对于 touchstart 事件而言，则会在用户手指触碰屏幕的一瞬间触发所绑定的事件。

当一个元素被同时绑定touchstart和click事件时，在移动端会被依次触发两次

解决方法：
1. 在touchstart中添加preventDefault, 虽然click不是默认事件，但浏览器实现了这种方式
2. 惰性函数，动态判断应该使用哪种方法绑定点击事件

## ios移动端问题
> 设置z-index不生效问题
```css
.sider {
    -webkit-transform: translateZ(1px);
  	-moz-transform: translateZ(1px);
    -o-transform: translateZ(1px);
    transform: translateZ(1px);
    z-index: 999;
 }
```

> touchstart selection问题

> 固定定位布局键盘挡住输入框内容

500ms定时器轮询`document,activeElement`，如果触发input就改为static定位，这样浏览器就会把内容顶上去

> 底部Input被弹出的键盘遮挡

利用scrollIntoView让元素滚动到可视区域

> click的300ms延迟和点击穿透

https://www.jianshu.com/p/6e2b68a93c88

> 在移动端上，在你用overflow-y:scorll属性的时候，你会发现滚动的效果很木，很慢

`-webkit-overflow-scrolling:touch`

https://www.cnblogs.com/xiahj/p/8036419.html

> 如何解决长时间按住页面出现闪退

`-webkit-touch-callout: none;`

> 触摸元素时出现半透明灰色这招

`-webkit-tap-highlight-color: rgba(255,255,255,0)`