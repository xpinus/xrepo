---
sort: 40
---

# 如何修改 Chrome 记住密码后自动填充表单的黄色背景

- 产生原因：由于 Chrome 默认会给自动填充的 input 表单加上 `input:-webkit-autofill` 私有属性造成的
- 解决方案 1：在 form 标签上直接关闭了表单的自动填充：`autocomplete="off"`
- 解决方案 2：`input:-webkit-autofill { background-color: transparent; }`

**input [type=search] 搜索框右侧小图标如何美化？**

```css
input[type="search"]::-webkit-search-cancel-button {
	-webkit-appearance: none;
	height: 15px;
	width: 15px;
	border-radius: 8px;
	background: url("images/searchicon.png") no-repeat 0 0;
	background-size: 15px 15px;
}
```
