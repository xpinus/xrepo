import { activeEffect } from './effect.js';
import { ITERATE_PROP } from '../util.js';

let trackable = true;

export function pauseTracking() {
    trackable = false;
}

export function enableTracking() {
    trackable = true;
}

/**
 *  targetMap<target, propMap>
 *  存储对象和其属性的依赖关系
 */
export const targetMap = new WeakMap();

export default function (target, prop, type) {
    if (!trackable || !activeEffect) return;

    let propMap = targetMap.get(target); // propMap存储对象的prop和操作typeMap的依赖关系
    if (!propMap) {
        propMap = new Map();
        targetMap.set(target, propMap);
    }

    if (typeof prop === 'undefined') {
        prop = ITERATE_PROP;
    }

    let typeMap = propMap.get(prop); // 操作和depSet的依赖
    if (!typeMap) {
        typeMap = new Map();
        propMap.set(prop, typeMap);
    }

    let depSet = typeMap.get(type); // depSet存储操作的dep
    if (!depSet) {
        depSet = new Set();
        typeMap.set(type, depSet);
    }

    depSet.add(activeEffect); // 存储当前正在执行的副作用函数
    activeEffect._deps.push(depSet);
}
