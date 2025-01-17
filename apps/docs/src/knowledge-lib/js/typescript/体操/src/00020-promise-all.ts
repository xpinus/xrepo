// 实现：
declare function PromiseAll<T extends any[]>(arr: T): Promise<{ [K in keyof T]: Awaited<T[K]> }>;

// 用例：
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
