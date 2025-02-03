# CSS中的定位

## static 静态定位

默认，就是标准流的排列，不受top,bottom,left,right的影响

## relative 相对定位
- 相对于其正常所处位置进行定位
- 不脱离文档流
- 应用：子绝父相

## absolute
- 相对于最近的具有定位的父元素进行定位
  - 没有时，如果设置top, 则相对于**页面（不是浏览器窗口）**左上角定位
  - 没有时，如果设置bottom，则相对于**浏览器窗口（首屏渲染页面，根滚动无关）**左下角，
- 脱离文档流，触发 BFC
- display属性会变成block

## fixed
- 相对于浏览器窗口进行定位
- 脱离文档流，触发 BFC

## sticky


滚动区域下元素：position: stickey + top(阈值)

