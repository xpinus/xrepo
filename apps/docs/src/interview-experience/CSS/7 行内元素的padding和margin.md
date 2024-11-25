---
sort: 7
---

# 给行内元素设置 padding 和 margin 是否生效？

- 块级元素的 padding 和 margin 值的设置都是有效的。
- 行内元素的 margin-left 和 margin-right 是有效的，margin-top 和 margin-bottom 并没有起作用。
- padding 类似，但要注意 padding-top/bottom 会使得该元素的上下范围变大，但只是表象（实际没有作用），对周围的元素无影响。
