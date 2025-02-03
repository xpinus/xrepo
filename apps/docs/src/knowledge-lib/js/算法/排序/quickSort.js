// 非原地实现
function quickSort1(arr) {
    if (arr.length <= 1) return arr;

    const left = []
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }


    return [...quickSort1(left), arr[0], ...quickSort1(right)];

}

// 用例
console.log(quickSort1([5, 2, 8, 32, 1, 9]));

// 原地实现
const quickSort = function (arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
    return arr;
};

const partition = function(arr, left, right) {
    const pivotValue = arr[left];
    let i = left;
    let j = right;
    while (i < j) {
        while (i < j && arr[j] >= pivotValue) {
            j--;
        }
        while (i < j && arr[i] <= pivotValue) {
            i++;
        }
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    if(arr[i] > pivotValue) i--;
    [arr[i], arr[left]] = [arr[left], arr[i]];
    return i;
};

// 用例
console.log(quickSort([5, 2, 8, 32, 1, 9]));


