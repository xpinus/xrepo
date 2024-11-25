---
sort: 3
---

# `<link>`和`@import`的区别

- `<link>`：
  - `HTML`方式
  - 最大限度支持并行下载
  - 可以通过`rel="alternate stylesheet"`指定候选样式
  - 浏览器支持更好
- `@import`：
  - `CSS`方式
  - 过多嵌套导致串行下载，出现`FOUC`（文档样式短暂失效）
  - 必须在样式规则之前，可以在 css 文件中引用其他文件
