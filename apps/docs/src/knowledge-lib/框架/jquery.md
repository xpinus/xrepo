# jquery

> window.onload 和$(document).ready区别

- `window.onload()`方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。
- `$(document).ready()`是`DOM`结构绘制完毕后就执行，不必等到加载完毕 [MDN DOMContentLoaded 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

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