// 实现：
type If<C extends boolean, T, F> = C extends true ? T : F;

// 用例：
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
