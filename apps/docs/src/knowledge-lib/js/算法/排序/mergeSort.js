function mergeSort(arr) {
    const len = arr.length;
    if (len <= 1) return arr;

    const mid = Math.floor(len / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid, len));

    const result = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    if (left.length) {
        result.push(...left);
    }
    if (right.length) {
        result.push(...right);
    }

    return result;

}

// 用例
console.log(mergeSort([5, 2, 8, 32, 1, 9]));
