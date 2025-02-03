# BFC
> block formatting context 块级格式化上下文。形成一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的布局不会相互影响

> 介绍下BFC及其应用
- **触发条件**（任意一条）：
    - 浮动元素----`float`的值不为`none`
    - 块级元素----`display`的值为`table-cell`，`table-caption`或`inline-block`
    - `overflow`的值不为`visible`
    - 绝对定位元素---`position`的值`ablsolute`或`fixed`
    - `flex`元素
    - `IE`中，`Layout`，可通过`zoom: 1`触发
- 与普通文档流的**区别**：
    - 普通文档流：
        - 浮动的元素不会被父级计算高度
        - 非浮动元素会覆盖浮动元素的位置
        - `margin`会传递给父级元素
        - 两个相邻元素的上下`margin`会重叠
    - BFC 布局规则：
        - 不与浮动元素重叠
          - 浮动的元素会被父级计算高度（父级元素触发了`BFC`），解决浮动元素父元素高度坍塌的问题
          - 非浮动元素不会覆盖浮动元素的位置（非浮动元素触发了`BFC`）
        - 为防止 A、B 的 margin 重叠给 A 添加一个包裹器 wrap，让 wrap 触发 BFC，从而让 A\B 的 margin 同时起作用
            - `margin`不会传递给父级（父级触发`BFC`）
            - 属于同一个`BFC`的两个相邻元素上下`margin`会重叠
            - 两个 BFC 之间的 margin 也会重叠
- 开发中的**应用**：
    - 阻止`margin`重叠
    - 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 `div`都位于同一个 `BFC` 区域之中)
    - 自适应两栏布局：右侧浮动w200，左侧（清除浮动）100%-200px
    - 可以阻止元素被浮动元素覆盖

> 各种FC
- IFC： Inline Format Context 行内格式化上下文，一块区域以行内元素的形式来格式化
- GFC： Grid Format Context 网格格式化上下文
- FFC： Flex Format Context 弹性格式化上下文