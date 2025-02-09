async function async1() {
	console.log("async1 start");
	await async2();
	console.log("async1 end");  // await结束后会把后续内容推进微队列
}
async function async2() {
	console.log("async2");
	return Promise.resolve().then(() => {
		console.log("async2 end1");
	}); // Promise.resolve相当于把后续函数推进微队列
}

console.log("script start");

setTimeout(() => {
	console.log("setTimeout");
}, 0);

async1();

new Promise((resolve) => {
	console.log("promise1");
	resolve();
})
	.then(() => {
		console.log("promise2");
	})
	.then(() => {
		console.log("promise3");
	});
console.log("script end");
