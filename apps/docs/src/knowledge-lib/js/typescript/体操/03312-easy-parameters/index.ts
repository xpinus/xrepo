// 我的实现：
type MyParameters<T extends (...args: unknown[]) => unknown> = T extends (...args: infer P) => unknown ? P : never;

// 用例：
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
