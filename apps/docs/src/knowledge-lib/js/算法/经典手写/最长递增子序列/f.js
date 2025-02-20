// 思路：贪心算法 + 二分查找 + 反向链表

function getSequence(arr) {
    const p = arr.slice(); // 复制原数组，用于构建反向链表
    const result = [0]; // 结果，为最长子序列值的索引
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        // 遍历原数组
        const arrI = arr[i]; // 当前值
        if (arrI !== 0) {
            j = result[result.length - 1]; // 获取最后一位保存的索引值
            if (arr[j] < arrI) {
                p[i] = j; // 记录反向链表，指向结果序列最后一位
                result.push(i); // 把i追加在结果序列末尾
                continue;
            }
            // 当前值比result末尾索引对应的值小时
            u = 0;
            v = result.length - 1;
            while (u < v) {
                //  二分查找
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                // 找到result中第一位比当前值大的
                if (u > 0) {
                    p[i] = result[u - 1]; // 记录反向链表，指向结果序列前一位
                }
                result[u] = i; // 用当前索引值i，替换原来的值
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        // 从后往前遍历，回溯修正结果序列
        result[u] = v;
        v = p[v];
    }
    return result;
}

console.log(getSequence([10, 30, 200, 300, 40, 50, 60]));
console.log(getSequence([10, 0, 1, 2, 3, 1, 5]));
