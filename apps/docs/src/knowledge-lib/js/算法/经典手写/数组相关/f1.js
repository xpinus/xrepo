function myFlat(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? myFlat(cur) : [cur]);
    }, []);
}

// 用例
const arr = [1, [2, 3, [4, [5]]]];
console.log(arr.flat(Infinity)); // Array方法
console.log(myFlat(arr));
