// 我的实现：
type Spcae = ' ' | '\n' | '\t';
type Trim<S extends string> = S extends `${Spcae}${infer R}` | `${infer R}${Spcae}` ? Trim<R> : S;

// 使用Exclude实现
// type MyOmit<T, K extends keyof T> = {
//     [P in Exclude<keyof T, K>]: T[P]
// }

// 用例：
type trimed = Trim<'  Hello World  '>; // expected to be 'Hello World'
