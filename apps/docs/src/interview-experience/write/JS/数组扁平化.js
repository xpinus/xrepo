const arr = [1, [2, 3, [4, [5]]]];

//

function myFlat(arr) {
	return arr.reduce((pre, cur) => {
		return pre.concat(Array.isArray(cur) ? myFlat(cur) : [cur]);
	}, []);
}

console.log(myFlat(arr));
console.log(arr.flat(Infinity));
debugger;
