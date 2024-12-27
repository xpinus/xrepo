const arr = [1, undefined, 3, null, 4];
arr.length = 8;
arr[6] = 6;

// arr.map((item) => {
// 	console.log(item);
// });

arr.forEach((item) => console.log(item));
