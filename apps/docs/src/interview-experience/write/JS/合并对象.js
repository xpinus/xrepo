let a = {
	name: "a",
	age: 15,
};

let b = {
	name: "b",
	money: 1000,
};

let c1 = Object.assign(a, b);

let c2 = { ...a, ...b };

console.log(c1);
console.log(c2);
