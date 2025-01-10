// 我的实现：
type Push<T extends readonly unknown[], K> = [...T, K];

// 用例：
type Result = Push<[1, 2], '3'>; // [1, 2, '3']
