function toTree(arr, pid) {
    return arr
        .filter((item) => item.pid === pid)
        .map((item) => {
            return { ...item, children: toTree(arr, item.id) };
        });
}

// 示例
const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 3 },
];
console.log(toTree(arr, 0));
