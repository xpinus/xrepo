---
sort: 45
---

# flex属性

flex属性定义,flex 是三个属性的简写。

`flex: flex-grow flex-shrink flex-basis`

`flex-grow` 父元素容器宽度富余时，分配多余的宽度的比例，单位是数字

`flex-shrink` 父元素容器宽度不足时，分配欠缺的宽度的比例，单位是数字

`flex-basis` 父元素容器宽度分配的基准值，也就是最小的计算单位，数值是宽度, 该元素占据主轴的大小

注意：如果元素不是弹性盒模型对象的子元素，则 flex 属性不起作用。

**flex属性分配**

flex 设置为 1 的时候。其三个元素的默认值是 1, 1, auto.
