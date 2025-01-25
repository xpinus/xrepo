import { targetMap } from './track.js';
import { TriggerOpTypes, TrackOpTypes, ITERATE_PROP } from '../util.js';

// 定义修改数据和触发数据的映射关系
const triggerTypeMap = {
    [TriggerOpTypes.SET]: [TrackOpTypes.GET],
    [TriggerOpTypes.ADD]: [TrackOpTypes.GET, TrackOpTypes.ITERATE, TrackOpTypes.HAS],
    [TriggerOpTypes.DELETE]: [TrackOpTypes.GET, TrackOpTypes.ITERATE, TrackOpTypes.HAS],
};

export default function trigger(target, prop, type) {
    const propMap = targetMap.get(target);
    if (!propMap) return;

    // 如果是新增或者删除操作，会涉及到额外触发迭代
    const keys = [prop];
    if (prop === TriggerOpTypes.ADD || prop === TriggerOpTypes.DELETE) {
        keys.push(ITERATE_PROP);
    }

    for (const key of keys) {
        const typeMap = propMap.get(key);
        if (!typeMap) return;

        const relationType = triggerTypeMap[type];

        for (const trackType of relationType) {
            const depSet = typeMap.get(trackType);
            if (!depSet) continue;

            const effects = Array.from(depSet); // 取出当前值，而不是直接迭代，避免effect执行期间再次收集依赖
            for (const effect of effects) {
                effect();
            }
        }
    }

    // console.log(propMap);
}
