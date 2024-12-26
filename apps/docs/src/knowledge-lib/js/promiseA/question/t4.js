new Promise((resolve) => {
	console.log(1);
	resolve();
})
	.then(() => {
		new Promise((resolve) => {
			console.log(2);
			resolve();
		}).then(() => {
			console.log(4); // 执行完这个then的promise状态才会由pending变为fullfilled
		});
	})
	.then(() => {
		console.log(3); // 只有当状态变为onFullfilled才会执行then
	});
