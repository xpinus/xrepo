export function isObject(value) {
    return typeof value === 'object' && value !== null;
}

export const TrackOpTypes = {
    GET: 'get',
    HAS: 'has',
    ITERATE: 'iterate',
};

export const TriggerOpTypes = {
    ADD: 'add',
    DELETE: 'delete',
    SET: 'set',
};

// 零值相等
export function isSameValue(a, b) {
    if (a === 0 && b === 0) {
        return true;
    }

    return Object.is(a, b);
}

//
export const RAW = Symbol('raw');
