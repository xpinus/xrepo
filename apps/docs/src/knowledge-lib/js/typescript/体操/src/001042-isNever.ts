// 实现：
type IsNever<T extends unknown> = [T] extends [never] ? true : false;

// 用例：
type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false
