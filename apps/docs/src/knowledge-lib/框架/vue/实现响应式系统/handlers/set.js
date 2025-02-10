import { isSameValue, TriggerOpTypes } from '../util.js';
import trigger from '../effect/trigger.js';

export default function (target, prop, value, receiver) {
    let type = TriggerOpTypes.SET;
    if (!target.hasOwnProperty(prop)) {
        type = TriggerOpTypes.ADD;
    }

    const oldValue = target[prop];
    const oldLen = Array.isArray(target) ? target.length : undefined;

    const result = Reflect.set(target, prop, value, receiver);

    if (!isSameValue(oldValue, value)) {
        trigger(target, prop, type);

        // 当数组的长度发生变化时的特别操作
        if (Array.isArray(target) && oldLen !== target.length) {
            if (prop !== 'length') {
                // length 发生了隐式变化
                trigger(target, 'length', TriggerOpTypes.SET);
            } else {
                // length 发生了显式变化, 处理length减小时的隐式delete
                for (let i = target.length; i < oldLen; i++) {
                    trigger(target, i.toString(), TriggerOpTypes.DELETE);
                }
            }
        }
    }

    return result;
}
