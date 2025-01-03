const arr = [4, 3, 2, 5, 6, 1, 9];

// 冒泡排序
function Bubble(arr) {
	let len = arr.length;

	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - i; j++) {
			if (arr[j] > arr[j + 1]) {
				let tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}

	return arr;
}

console.log(Bubble(arr));
