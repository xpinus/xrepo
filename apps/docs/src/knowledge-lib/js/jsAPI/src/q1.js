console.time('a');
for (let i = 0; i < 1000000; i++) {
    const obj = {};
    obj['a'] = i;
}
console.timeEnd('a');

console.time('b');
for (let i = 0; i < 1000000; i++) {
    const obj = {};
    obj[`${i}`] = i;
}
console.timeEnd('b');
