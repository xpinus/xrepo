// 我的实现：
type Replace<T extends string, From extends string, To extends string> = T extends `${infer prefix}${From}${infer suffix}`
    ? `${prefix}${To}${suffix}`
    : T;

// 用例：
type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // 期望是 'types are awesome!'
