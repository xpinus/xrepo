// 实现：
type Last<T extends unknown[]> = [unknown, ...T][T['length']];
// type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

// 用例：
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // 应推导出 'c'
type tail2 = Last<arr2>; // 应推导出 1
