function isPrimitive(target) {
    return target !== Object(target); // Object()参数如果是引用数据会原样返回
}

function deepClone(target, cache = new WeakMap()) {
    if (isPrimitive(target)) return target;

    if (cache.has(target)) return cache.get(target);
    const newObj = new target.constructor();
    cache.set(target, newObj);

    if (newObj instanceof Function) return newObj; // Function下去遍历会有而外的属性，这里直接返回

    for (const key of Reflect.ownKeys(target)) {
        newObj[key] = deepClone(target[key], cache);
    }

    return newObj;
}

// 测试：
const test = {
    name: 'xyf',
    age: 16,
    children: {
        name: 'ch1',
        age: 0,
    },
    f: [1, 2, 3],
    others: undefined,
    action: function () {
        console.log(this.name);
    },
    // s: new Set([1, 2, 3]),   // Set Map还是要额外处理
};
test.children.circle = test; // 循环引用

const cloneObj = deepClone(test);

console.log(cloneObj.children === test.children); // false
test.action();
// console.log(cloneObj === cloneObj.children.circle);
