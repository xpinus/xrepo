for (var i = 0; i < 10; i++) {
	setTimeout(() => {
		console.log(i);
	}, 0);
}
// 10 * 10

// 立即执行函数
for (var i = 0; i < 10; i++) {
	(function (n) {
		setTimeout(() => {
			console.log(n);
		}, 0);
	})(i);
}
// 0 1 2 3 4 5 6 7 8 9
