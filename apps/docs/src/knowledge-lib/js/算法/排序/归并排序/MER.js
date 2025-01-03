const arr = [4, 3, 2, 5, 6, 1, 9];

// 归并排序
function Merge(arr) {
	if (arr.length === 1) return arr;

	let len = arr.length;

	let left = Merge(arr.slice(0, len / 2));

	let right = Merge(arr.slice(len / 2, len));

	let res = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			res.push(left.shift());
		} else {
			res.push(right.shift());
		}
	}

	if (left.length) {
		res = res.concat(left);
	}
	if (right.length) {
		res = res.concat(right);
	}

	return res;
}

console.log(Merge(arr));
