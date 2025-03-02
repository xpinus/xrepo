import React from 'react';

// 用于管理每次useEffect的事件
let hookStates = [];
let hookIndex = 0;

function useEffect(callback, dependencies) {
    if (hookStates[hookIndex]) {
        // 非初始调用

        let lastDependencies = hookStates[hookIndex];
        // 判断依赖项是否改变
        let same = dependencies.every((item, index) => item === lastDependencies[index]);

        if (same) {
            hookIndex++;
        } else {
            hookStates[hookIndex++] = dependencies;
            callback();
        }
    } else {
        // 初始调用
        hookStates[hookIndex++] = dependencies;
        callback();
    }
}

export default useEffect;
