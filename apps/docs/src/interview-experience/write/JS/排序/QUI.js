const arr = [4, 3, 2, 5, 6, 1, 9];

// 快速排序
function Quick(arr) {
	if (arr.length <= 1) return arr;

	let left = [];
	let right = [];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[0]) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	left = Quick(left);
	right = Quick(right);

	return [...left, arr[0], ...right];
}

console.log(Quick(arr));
