---
sort: 9
---

# window.onload 和$(document).ready

> 原生`JS`的`window.onload`与`Jquery`的`$(document).ready(function(){})`有什么不同？如何用原生 JS 实现 Jq 的`ready`方法？

- `window.onload()`方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。
- `$(document).ready()`是`DOM`结构绘制完毕后就执行，不必等到加载完毕

```js
function ready(fn) {
	if (document.addEventListener) {
		//标准浏览器
		document.addEventListener(
			"DOMContentLoaded",
			function () {
				//注销事件, 避免反复触发
				document.removeEventListener(
					"DOMContentLoaded",
					arguments.callee,
					false
				);
				fn(); //执行函数
			},
			false
		);
	} else if (document.attachEvent) {
		//IE
		document.attachEvent("onreadystatechange", function () {
			if (document.readyState == "complete") {
				document.detachEvent("onreadystatechange", arguments.callee);
				fn(); //函数执行
			}
		});
	}
}
```
