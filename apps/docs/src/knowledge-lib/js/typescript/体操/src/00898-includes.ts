// 我的实现：
type Includes<T extends readonly any[], K> = K extends T[number] ? true : false;

// 点赞最多的
type _Includes<T extends readonly any[], U> = {
    [P in T[number]]: true;
}[U] extends true
    ? true
    : false;

// 用例：
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
