import reactive from '../reactive.js';
import { isObject, TrackOpTypes, RAW } from '../util.js';
import track, { pauseTracking, enableTracking } from '../effect/track.js';

const arrayInstrumentations = {};

['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
    arrayInstrumentations[method] = function (...args) {
        let result = Array.prototype[method].apply(this, args);

        if (result < 0 || result === false) {
            result = Array.prototype[method].apply(this[RAW], args);
        }

        return result;
    };
});

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
