export * from './response';
export * from './uuid';
export * from './constant';

/**
 * 执行一个promise，有重试机制
 * @param promise
 * @param times 重试次数,默认为3
 * @returns
 */
export function retryPromise<T>(promise: Promise<T>, times = 3) {
    let count = 0;

    const execute = async () => {
        count++;
        try {
            return await promise;
        } catch (error) {
            if (count > times) {
                throw error;
            }

            return await sleep(3000).then(() => {
                return execute();
            });
        }
    };

    return execute();
}

/**
 * 睡眠
 * @param ms
 */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 单例
 */
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
