// 我的实现：
type StringLength<S extends string, T extends string[] = []> = S extends `${infer C}${infer rest}`
    ? StringLength<rest, [...T, C]>
    : T['length'];

// 用例：
type len = StringLength<'hello'>; // 5
