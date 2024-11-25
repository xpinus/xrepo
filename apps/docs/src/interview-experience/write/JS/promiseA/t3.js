const p1 = new Promise((resolve) => {
	setTimeout(() => {
		resolve("resolve3");
	});
	resolve("resovle1");
	resolve("resovle2");
})
	.then((res) => {
		console.log(res);
		setTimeout(() => {
			console.log(p1);
		}, 100);
	})
	.finally(() => {
		console.log("finally");
	});

// resolve只会执行一次
