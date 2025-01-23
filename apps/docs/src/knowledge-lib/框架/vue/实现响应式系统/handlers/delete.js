import { TriggerOpTypes } from '../util.js';
import trigger from '../effect/trigger.js';

export default function (target, prop) {
    trigger(target, prop, TriggerOpTypes.DELETE);
    return Reflect.deleteProperty(target, prop);
}
