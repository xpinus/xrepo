function insertionSort(arr) {
    const N = arr.length;

    for (let r = 0; r < N; r++) {
        for (let j = r + 1; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(j, j - 1);
            } else {
                break;
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
console.log(insertionSort([5, 2, 8, 32, 1, 9]));
