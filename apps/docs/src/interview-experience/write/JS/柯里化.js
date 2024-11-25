// add
function add() {
	let args = Array.from(arguments);

	let inner = function () {
		args.push(...arguments);
		return inner;
	};

	inner.toString = function () {
		return args.reduce((pre, cur) => pre + cur);
	};

	return inner;
}

let result = add(1, 2, 3)(4);
console.log(result.toString());
console.log(add(1)(2)(3)(4));
