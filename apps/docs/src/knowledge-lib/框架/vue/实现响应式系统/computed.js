import effect from './effect/effect.js';
import track from './effect/track.js';
import trigger from './effect/trigger.js';
import { TriggerOpTypes, TrackOpTypes } from './util.js';

function normalizeParams(val) {
    let getter, setter;
    if (typeof val === 'function') {
        getter = val;
        setter = () => {
            console.warn('there is no setter');
        };
    } else {
        getter = val.get;
        setter = val.set;
    }

    return {
        getter,
        setter,
    };
}

export default function computed(getterOrOptions) {
    const { getter, setter } = normalizeParams(getterOrOptions);

    let value; // 缓存值
    let dirty = true; // 脏值判断是否需要重新计算

    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            dirty = true;
            trigger(obj, 'value', TriggerOpTypes.SET);
        },
    });

    const obj = {
        get value() {
            track(obj, 'value', TrackOpTypes.GET);
            if (dirty) {
                value = effectFn();
                dirty = false;
            }
            return value;
        },
        set value(newVal) {
            setter(newVal);
        },
    };

    return obj;
}
