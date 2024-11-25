console.log(null + 1); // 1
console.log(null + undefined); // NaN
console.log(null + []); // null
console.log(null + [1, 2]); // null1,2
console.log(null + {}); // null[object Object]
console.log(!null + 1); // 2

var a = 3;
// console.log(a + a++ * ++a); // 18 =   3 * 5 + 3
console.log(a + ++a * a++); // 3 + 4 * 4 = 19     // 理解：++a或a++在执行的时候会获取a当前的最新值
console.log(a); // 5
