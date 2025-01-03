// 实现：
type First<T extends readonly PropertyKey[]> = T[number] extends never ? never : T[0];
// type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never

// 用例：
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
