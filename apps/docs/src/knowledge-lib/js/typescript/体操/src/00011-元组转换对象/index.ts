// 实现：
type TupleToObject<T extends readonly PropertyKey[]> = {
    [K in T[number]]: K;
};

// ts内置的类型PropertyKey, 类型定义是declare type PropertyKey = string | number | symbol;
// 元组的索引都是number类型的，所以当使用T[number]取出T中所有number类型的索引时，可以一次全部取到所有元素的类型

// 用例：
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
type result = TupleToObject<typeof tuple>