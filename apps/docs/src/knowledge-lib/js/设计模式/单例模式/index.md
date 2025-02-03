# 单例模式

<<< ./index.js

> 代理实现
```ts
export function singleton<T extends new (...args: any[]) => any>(classname: T): T {
    let instance: InstanceType<T>;
    const singletonClass = new Proxy(classname, {
        construct(target, args) {
            if (!instance) {
                instance = Reflect.construct(target, args);
            }
            return instance;
        },
    });

    (singletonClass as any).prototype.constructor = singletonClass;

    return singletonClass;
}

```