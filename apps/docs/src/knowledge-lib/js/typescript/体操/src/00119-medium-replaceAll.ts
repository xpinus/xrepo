// 我的实现：
type ReplaceAll<S extends string, From extends string, To extends string> = S extends `${infer prefix}${From}${infer suffix}`
    ? `${prefix}${To}${ReplaceAll<suffix, From, To>}`
    : S;

// 用例：
type replaced = ReplaceAll<'t y p e s', ' ', ''>; // 期望是 'types'
