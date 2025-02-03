// 我的实现：
type Absolute<T extends string | number | bigint > = `${T}` extends `-${infer U}` ? `${U}` : `${T}`

// 用例：
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"