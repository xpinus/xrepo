const obj = {
    [Symbol()]: 1,
};

console.log(Object.keys(obj).length === 0);
console.log(JSON.stringify(obj) === '{}');

var empty = true;
for (const key in obj) {
    empty = false;
}
console.log(empty);

console.log(Reflect.ownKeys(obj).length === 0);
