import reactive from '../reactive.js';
import { isObject, TrackOpTypes, RAW } from '../util.js';
import track, { pauseTracking, enableTracking } from '../effect/track.js';

const arrayInstrumentations = {};

// 因为数组内的对象会被代理为proxy导致寻找原始值时找不到，因此需要特殊处理
['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
    arrayInstrumentations[method] = function (...args) {
        // 1. 正常找，此时this指向的是代理对象
        let result = Array.prototype[method].apply(this, args);

        if (result < 0 || result === false) {
            // 2. 未找到，此时this[RAW]拿到原始对象
            result = Array.prototype[method].apply(this[RAW], args);
        }

        return result;
    };
});

// 在调用这几个方法的时候，需要暂停依赖收集，调用完毕之后再恢复
['push', 'pop', 'unshift', 'shift', 'splice'].forEach((method) => {
    arrayInstrumentations[method] = function (...args) {
        pauseTracking();
        const result = Array.prototype[method].apply(this, args);
        enableTracking();
        return result;
    };
});

export default function (target, prop, receiver) {
    if (prop === RAW) return target;

    track(target, prop, TrackOpTypes.GET);

    if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(prop)) {
        return arrayInstrumentations[prop];
    }

    const result = Reflect.get(target, prop, receiver);
    if (isObject(result)) {
        // 获取到的成员可能是对象，需要递归处理，将其转换为响应式
        return reactive(result);
    }

    return Reflect.get(target, prop, receiver);
}
