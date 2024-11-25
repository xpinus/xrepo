---
sort: 14
---

# `position`不同值的定位原点

- `position: releactive`：相对定位，相对于其正常所处位置进行定位
- `position: absolute`：绝对定位，相对于最近的具有定位的父元素进行定位，没有则相对于浏览器窗口
  - 脱离文档流，触发 BFC
- `position: fixed`：固定定位，相对于浏览器窗口进行定位
  - 脱离文档流，触发 BFC
- `position: static`：默认值，无定位，正常处于数据流中
- `position: inherit`：继承父元素的设置
