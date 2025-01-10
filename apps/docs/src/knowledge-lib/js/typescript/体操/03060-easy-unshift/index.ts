// 我的实现：
type Unshift<T extends readonly unknown[], K> = [K, ...T];

// 用例：
type Result = Unshift<[1, 2], 0>; // [0, 1, 2]
