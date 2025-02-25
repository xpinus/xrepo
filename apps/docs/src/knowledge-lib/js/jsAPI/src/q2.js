console.time('a');
const arr1 = [];
for (let i = 0; i < 1000000; i++) {
    arr1[i] = 1;
}
console.timeEnd('a');

console.time('b');
const arr2 = [];
arr2[1000000 - 1] = 1;
for (let i = 0; i < 1000000; i++) {
    arr2[i] = i;
}
console.timeEnd('b');
