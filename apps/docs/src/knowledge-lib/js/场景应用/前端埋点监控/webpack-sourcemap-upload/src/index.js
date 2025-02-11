function component() {
	var btn = document.getElementById("test");
	btn.addEventListener("click", () => {
		console.log("xxx");
		throw new Error("测试");
	});

	window.addEventListener("error", (e) => {
		console.log(e);
		let temp = e.filename.split("/");
		navigator.sendBeacon(
			"http://localhost:7001/logstore/error",
			JSON.stringify({
				filename: temp[temp.length - 1],
				lineno: e.lineno,
				colno: e.colno,
			})
		);
	});

	var element = document.createElement("div");

	// Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
	element.innerHTML = ["Hello", "webpack"].join(" ");

	return element;
}

document.body.appendChild(component());
