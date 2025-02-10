import effect, { cleanup } from './effect/effect.js';

export default function watch(source, cb, options) {
    // 1. 参数归一化，注意未考虑数组情况
    let getter;
    if (typeof source === 'function') {
        getter = source;
    } else {
        getter = () => traverse(source);
    }

    let oldValue;
    const job = () => {
        const newValue = effectFn();
        cb(newValue, oldValue);
        oldValue = newValue;
    };

    const effectFn = effect(getter, {
        lazy: true,
        scheduler: () => {
            if (options.flush === 'post') {
                Promise.resolve().then(job);
            } else {
                job();
            }
        },
    });

    if (options.immediate) {
        job();
    } else {
        effectFn(); // 触发依赖
    }

    return () => cleanup(effectFn());
}

// 遍历读取数据，触发依赖收集
function traverse(value, seen = new Set()) {
    if (isPrimitive(value) || seen.has(value)) {
        return value;
    }

    seen.add(value);

    for (const key in value) {
        // for in 遍历数组可能存在问题
        traverse(value[key], seen);
    }
}

// 是原始数据类型
function isPrimitive(val) {
    return val !== Object(val);
}
