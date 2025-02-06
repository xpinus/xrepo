// 我的实现：
type KebabCase<T extends string> = T extends `${infer Char}${infer Rest}`
    ? Rest extends `${Uncapitalize<Rest>}`
        ? `${Uncapitalize<Char>}${KebabCase<Rest>}`
        : `${Uncapitalize<Char>}-${KebabCase<Rest>}`
    : T;

// Uncapitalize 用于将首字母转换为小写

// 用例：
type FooBarBaz = KebabCase<'FooBarBaz'>;
const foobarbaz: FooBarBaz = 'foo-bar-baz';

type DoNothing = KebabCase<'do-nothing'>;
const doNothing: DoNothing = 'do-nothing';
