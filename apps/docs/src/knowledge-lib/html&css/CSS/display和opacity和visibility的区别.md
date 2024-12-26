# CSS 隐藏元素 display、visibility、opacity 的区别

- `display:none`：
  - 让元素从渲染树中消失，渲染时不占用任何空间
  - 非继承属性，子节点是因为父元素从渲染树中消失了，所以也就消失了，修改子节点的属性也没用
  - 修改常规流中的`display`通产会造成文档重排
  - 读屏器不会读取`display:none`的元素内容
  - 元素仍然在DOM树中，但不会进入渲染树
  
- `visibility: hidden`：

  - 仍在渲染树中，占据空间，只是内容不可见
  - 继承属性，子孙节点因为继承了`visibility: hidden`因此消失，更改属性可以显示出来
  - 修改`visibility`只会使本元素重绘
  - 读屏器会读取`visibility: hidden`的元素内容
    使元素不可见。
    子元素设置 visibility:visible; 后，子元素会显示，但是父元素不会显示。
    绑定的事件不能触发。

- `opacity: 0`：
  实际上是元素的透明度为 0。
  子元素 opacity:1 是无效的，元素仍旧无法显示。
  绑定的事件仍旧可以触发。

## 请列举几种隐藏元素的方法

- `visibility: hidden;` 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- `opacity: 0;` `CSS3`属性，设置`0`可以使一个元素完全透明
- `position: absolute;` 设置一个很大的 `left` 负值定位，使元素定位在可见区域之外
- `display: none;` 元素会变得不可见，并且不会再占用文档的空间。
- `transform: scale(0);` 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- `<div hidden="hidden">` HTML5 属性,效果和`display:none;`相同，但这个属性用于记录一个元素的状态
- `height: 0;` 将元素高度设为 `0` ，并消除边框
- `filter: blur(0);` CSS3 属性，将一个元素的模糊度设置为`0`，从而使这个元素“消失”在页面中
