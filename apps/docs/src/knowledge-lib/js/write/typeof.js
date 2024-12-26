// typeof 可以正确识别：undefined、Boolean、Number、String、Symbol、Function、bigint 等类型的数据，但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。
// 可以使用 Object.prototype.toString 实现。

function myTypeOf(obj) {
	let res = Object.prototype.toString.call(obj).split(" ")[1];

	res = res.substring(0, res.length - 1).toLowerCase();

	return res;
}

console.log("\n1");
console.log(myTypeOf(1));
console.log(typeof 1);

console.log("\nFunction");
function test() {}
console.log(myTypeOf(test));
console.log(typeof test);

console.log("\n[]");
console.log(myTypeOf([]));
console.log(typeof []);

console.log("\nDate");
console.log(myTypeOf(new Date()));
console.log(typeof new Date());

console.log("\nBigInt");
console.log(typeof BigInt(123456));
console.log(myTypeOf(BigInt(123456)));
