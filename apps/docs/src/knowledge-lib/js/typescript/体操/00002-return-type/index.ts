// 我的实现：
type MyReturnType<T extends (...args: unknown[]) => unknown> = T extends (...args: unknown[]) => infer P ? P : never;

// 用例：
const fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
