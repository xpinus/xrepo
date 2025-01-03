console.log(1);
test();
console.log(4);

async function test() {
	console.log(2);
	await 3;
	console.log(3);
}
