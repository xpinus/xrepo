let parent = {
    name: 'xue',
    location: 'jiangsu',
};

const symbol3 = Symbol('test');
let son = {
    age: 25,
    2: 'numSort2',
    1: 'numSort3',
    symbol3: 'symbolSort',
};

Object.setPrototypeOf(son, parent); // 设置一个指定的对象的原型

for (let key in son) {
    console.log(key, son[key]);
}

console.log('##################');

// Object.keys 顺序问题同样
console.log(Object.keys(son).join('\n'));

console.log('##################');

// Object.entries 顺序问题同样
console.log(Object.entries(son).join('\n'));
