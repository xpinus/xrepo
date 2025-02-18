// 我的实现：
type AnyOf<T extends unknown[]> = T[number] extends 0 | '' | false | [] | { [key in string]: never } ? false : true;

// 用例：
type Sample1 = AnyOf<[1, '', false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be false.
