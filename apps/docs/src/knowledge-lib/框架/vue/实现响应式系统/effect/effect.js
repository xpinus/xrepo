import { targetMap } from './track.js';

export let activeEffect = null; // 当前正在执行的副作用函数

const effectStack = []; // 在effect函数嵌套的情况下表现在价值

export default function effect(fn, option = {}) {
    const { lazy = false } = option;

    const env = () => {
        activeEffect = env;
        effectStack.push(activeEffect);
        cleanup();
        fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
    };

    env._deps = [];

    if (!lazy) {
        env();
    }

    return env;
}

// 清理之前相关的依赖
function cleanup() {
    let deps = activeEffect._deps;
    for (let i = 0; i < deps.length; i++) {
        deps[i].delete(activeEffect);
    }
    deps.length = 0;
}
