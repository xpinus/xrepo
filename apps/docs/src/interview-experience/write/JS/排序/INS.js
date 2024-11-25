const arr = [4, 3, 2, 5, 6, 1, 9];

// 插入排序
function Insert(arr) {
	let len = arr.length;

	for (let i = 0; i < len; i++) {
		for (let j = i + 1; j > 0; j--) {
			if (arr[j] < arr[j - 1]) {
				let tmp = arr[j];
				arr[j] = arr[j - 1];
				arr[j - 1] = tmp;
			} else {
				break;
			}
		}
	}

	return arr;
}

console.log(Insert(arr));
