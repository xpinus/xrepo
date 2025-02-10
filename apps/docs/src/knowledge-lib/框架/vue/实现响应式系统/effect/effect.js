export let activeEffect = null; // 当前正在执行的副作用函数

const effectStack = []; // 在effect函数嵌套的情况下表现在价值

/**
 *  targetMap<target, propMap>
 *  存储对象和其属性的依赖关系
 */
export const targetMap = new WeakMap();

export default function effect(fn, option = {}) {
    const { lazy = false } = option;

    const env = () => {
        activeEffect = env;
        effectStack.push(activeEffect);
        cleanup(activeEffect);
        const result = fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return result;
    };

    env._deps = [];
    env._options = option;

    if (!lazy) {
        env();
    }

    return env;
}

// 清理之前相关的依赖
export function cleanup(effectFn) {
    let deps = effectFn._deps;
    for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effectFn);
    }
    deps.length = 0;
}
