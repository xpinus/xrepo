function selectionSort(arr) {
    const N = arr.length;
    for (let r = 0; r < N; r++) {
        let min = r;
        for (let index = r; index < N; index++) {
            if (arr[min] > arr[index]) {
                min = index;
            }
        }

        if (min === r) continue;
        swap(min, r);
    }

    function swap(a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    return arr;
}

// 用例
console.log(selectionSort([5, 2, 8, 32, 1, 9]));
