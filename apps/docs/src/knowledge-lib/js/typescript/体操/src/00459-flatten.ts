// 我的实现：
type Flatten<T extends unknown[]> = T extends [infer F, ...infer rest]
    ? F extends unknown[]
        ? [...Flatten<F>, ...Flatten<rest>]
        : [F, ...Flatten<rest>]
    : [];

// 用例：
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
