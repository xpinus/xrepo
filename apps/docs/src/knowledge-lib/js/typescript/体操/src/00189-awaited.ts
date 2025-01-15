// 实现：
type MyAwaited<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? (U extends PromiseLike<any> ? MyAwaited<U> : U) : never;
// type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;

// 用例：
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
