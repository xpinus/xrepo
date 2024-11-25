const arr = [4, 3, 2, 5, 6, 1, 9];

// 选择排序
function Select(arr) {
	let len = arr.length;

	for (let i = 0; i < len; i++) {
		let minIdx = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) {
				minIdx = j;
			}
		}
		if (minIdx !== i) {
			let tmp = arr[i];
			arr[i] = arr[minIdx];
			arr[minIdx] = tmp;
		}
	}

	return arr;
}

console.log(Select(arr));
