---
sort: 42
---

# 对 line-height 是如何理解的

- `line-height` 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 `height` 属性，那么其最终表现的高度是由 `line-height` 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 `line-height` 而不是容器内的文字内容
- 把 `line-height` 值设置为 `height` 一样大小的值可以实现单行文字的垂直居中
- `line-height` 和 `height` 都能撑开一个高度，`height` 会触发 `haslayout`，而 `line-height` 不会
