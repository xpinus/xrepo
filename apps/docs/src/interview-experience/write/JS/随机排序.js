const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 利用原生的sort
// 缺点：每个元素被派到新数组的位置不是随机的，原因是 sort() 方法是依次比较的。
function randomSort1(arr) {
	arr.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));

	arr.forEach((n) => console.log(n));
}
// randomSort1(nums);

function randomSort2(arr) {
	let len = arr.length;

	for (let i = 0; i < len - 1; i++) {
		let randomIdx = Math.floor(Math.random() * (len - i)) + i;

		[arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]];
	}

	arr.forEach((n) => console.log(n));
}
randomSort2(nums);
