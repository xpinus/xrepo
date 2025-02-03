// 实现：
type StringToUnion<T extends string> = T extends `${infer U}${infer rest}` ? U | StringToUnion<rest> : never

// 用例：
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"