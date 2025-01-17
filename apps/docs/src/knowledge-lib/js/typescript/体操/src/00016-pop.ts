// 实现：
type Pop<T extends unknown[]> = T extends [...infer rest, infer _] ? rest : never;
// type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

// 用例：
type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
