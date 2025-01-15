// 我的实现：
type Chainable<T = {}> = {
    option: <K extends string, V>(
        key: K extends keyof T ? (V extends T[K] ? never : K) : K,
        value: V,
    ) => Chainable<Omit<T, K> & Record<K, V>>;
    get: () => T;
};

// 可以使用 T = {} 来作为默认值，甚至默认参数与默认返回值，再通过递归传递 T 即可实现递归全局记录
// 为了约束 key 不可重复必须范型传入，value 是任意类型范型不做约束直接透传, 利用Record创建键值对
// K extends keyof T ? V extends T[K] ? never : K : K 限制相同key的类型不能重复
// 直接 & 联合并不能将相同 key 的类型覆盖，因此用 Omit 去掉前一个类型中相同的 key

// 用例：
declare const config: Chainable;

const result = config.option('foo', 123).option('name', 'type-challenges').option('bar', { value: 'Hello World' }).get();

// 期望 result 的类型是：
interface Result {
    foo: number;
    name: string;
    bar: {
        value: string;
    };
}
