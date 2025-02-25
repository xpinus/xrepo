const arr = [1, undefined, 3, null, 4];
arr.length = 8;
arr[6] = 6;

console.log('map');
arr.map((item) => {
    console.log(item);
});

console.log('forEach');
arr.forEach((item) => console.log(item));
