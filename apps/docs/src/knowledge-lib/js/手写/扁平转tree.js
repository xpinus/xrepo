const arr = [
	{ id: 1, pid: 0 },
	{ id: 2, pid: 0 },
	{ id: 3, pid: 1 },
	{ id: 4, pid: 2 },
	{ id: 5, pid: 3 },
];

// 法1 简单易懂，性能能差
function toTree(arr, pid) {
	return arr
		.filter((item) => item.pid === pid)
		.map((item) => {
			return { ...item, children: toTree(arr, item.id) };
		});
}
// console.log(toTree(arr, 0));

// 法2
function arrayToTree(arr) {
	let res = []; // 存放结果集
	let map = {};
	// 判断对象是否有某个属性
	let getHasOwnProperty = (obj, property) =>
		Object.prototype.hasOwnProperty.call(obj, property);

	// 边做map存储，边找对应关系
	for (const item of arr) {
		map[item.id] = {
			...item,
			children: getHasOwnProperty(map, item.id) ? map[item.id].children : [],
		};
		const newItem = map[item.id];
		if (item.pid === 0) {
			res.push(newItem);
		} else {
			if (!getHasOwnProperty(map, item.pid)) {
				map[item.pid] = {
					children: [],
				};
			}
			map[item.pid].children.push(newItem);
		}
	}
	return res;
}

console.log(arrayToTree(arr));

debugger;
