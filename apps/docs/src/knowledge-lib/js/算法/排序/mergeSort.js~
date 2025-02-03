function bubbleSort(arr) {
    const N = arr.length;
    for (let r = N - 1; r > 0; r--) {
        for (let index = 0; index < r; index++) {
            if (arr[index] > arr[index + 1]) {
                swap(index, index + 1);
            }
        }
    }

    function swap(a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    return arr;
}

// 用例
console.log(bubbleSort([5, 2, 8, 32, 1, 9]));
