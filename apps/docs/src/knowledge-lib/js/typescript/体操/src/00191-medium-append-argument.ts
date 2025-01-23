// 我的实现：
type AppendArgument<Fn, A> = Fn extends (...args: infer Args) => infer R ? (...args: [...Args, A]) => R : never;

// 用例：
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// 期望是 (a: number, b: string, x: boolean) => number
