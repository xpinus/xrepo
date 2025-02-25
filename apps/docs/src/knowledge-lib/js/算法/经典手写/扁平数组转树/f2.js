function toTree(arr) {
    const map = {};

    for (const item of arr) {
        // 创建自己和父级的关系
        if (map.hasOwnProperty(item.pid)) {
            map[item.pid].push(item);
        } else {
            map[item.pid] = [item];
        }

        // 创建自己和子级的关系
        if (map.hasOwnProperty(item.id)) {
            item.children = map[item.id];
        } else {
            item.children = [];
            map[item.id] = item.children;
        }
    }

    return map[0]; // 顶级pid下就是树的入口
}

const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 3 },
];
console.log(JSON.stringify(toTree(arr)));
