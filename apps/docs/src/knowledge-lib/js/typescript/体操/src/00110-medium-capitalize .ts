// 我的实现：
type Capitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S;

// 用例：
type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
