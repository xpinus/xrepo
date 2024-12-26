const arr = [1, 2, 3, 4, 3, 2, 5, 4];

// 1
const res1 = Array.from(new Set(arr));
console.log(res1);

// 2
const res2 = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(res2);
