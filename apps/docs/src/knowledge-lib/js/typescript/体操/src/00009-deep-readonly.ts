// 我的实现：
type DeepReadonly<T> = keyof T extends never
    ? T
    : {
          readonly [K in keyof T]: DeepReadonly<T[K]>;
      };

// 用例：
type X = {
    x: {
        a: 1;
        b: 'hi';
    };
    y: 'hey';
};

type Expected = {
    readonly x: {
        readonly a: 1;
        readonly b: 'hi';
    };
    readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
