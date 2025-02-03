// 我的实现：
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}` ?
    S2 extends Uncapitalize<S2> ? `${Uncapitalize<S1>}${KebabCase<S2>}` : `${Uncapitalize<S1>}-${KebabCase<S2>}`
    : S

// 用例：
type FooBarBaz = KebabCase<"FooBarBaz">
const foobarbaz: FooBarBaz = "foo-bar-baz"

type DoNothing = KebabCase<"do-nothing">
const doNothing: DoNothing = "do-nothing"