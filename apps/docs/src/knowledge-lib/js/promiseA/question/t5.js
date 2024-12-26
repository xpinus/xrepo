async function async1() {
	console.log("async1 start");
	await async2(); // p1
	console.log("async1 end");
}

async function async2() {
	console.log("async2");
}

console.log("script start");

setTimeout(function () {
	console.log("setTimeout"); // T1
}, 0);

async1();

new Promise(function (resolve) {
	console.log("promise1");
	resolve(); // p2
	console.log("promise2"); // 代码仍然会被执行
}).then(function () {
	console.log("promise3"); // p3
});

console.log("script end");

/*
 * script start
 * async1 start
 * async2
 * promise1
 * promise2
 * script end
 * async1 end
 * promise3
 * setTimeout
 */

// 微
// 宏  T1
