// 实现：
type Permutation<T, K = T> = [T] extends [never] ? [] : K extends T ? [K, ...Permutation<Exclude<T, K>>] : never;

// 用例：
type perm = Permutation<'A' | 'B' | 'C'>;
// ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
