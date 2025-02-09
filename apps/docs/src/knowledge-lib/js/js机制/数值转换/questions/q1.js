console.log([] == ![]); // true
// 1. 先执行![]，因为其有更高的优先级
// 2， ! 将对象强制强制为Boolean，任何对象都是true，所以结果为 !true
// 3， 接下来比较 [] == false，一边为对象，一边为原始值，将对象转换为原始值
// 4， []的toString方法会生效，转换为 '', 再把 ’‘ 转换为 boolean，结果为false
// 5， false == false 结果为true

console.log([] + 1); // '1'
console.log(null + 1); // 1
console.log(null + undefined); // NaN
console.log(!null + 1); // 2
console.log(null + []); // 'null'
console.log(null + [1, 2]); // 'null1,2'
console.log(null + {}); // 'null[object Object]'

var a = 3;
// console.log(a + a++ * ++a); // 18 =   3 * 5 + 3
console.log(a + ++a * a++); // 3 + 4 * 4 = 19     // 理解：++a或a++在执行的时候会获取a当前的最新值
console.log(a); // 5

var b = 2;
console.log(b ** ((++b) ** ++b));
// 1. 2 ** 3 ** 4
// 2. 因为**是右结合，即 2 ** (3 ** 4)
// 3. 结果为 2 ** 81

console.log(++[[]][+[]] + [+[]]); // '10'