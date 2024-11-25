import React from "react";

const hookStates = [];
const hookIndex = 0;

function useCallback(cb, dependencies) {
	if (hookStates[hookIndex]) {
		const [lastCb, lastDependencies] = hookStates[hookIndex];

		const same = dependencies.every(
			(item, index) => item === lastDependencies[index]
		);

		if (same) {
			hookIndex++;
			return lastCb;
		} else {
			const newCallback = cb;
			hookStates[hookIndex++] = [newCallback, dependencies];
			return newCallback;
		}
	} else {
		// 第一次调用
		let newCallback = cb;
		hookStates[hookIndex++] = [newCallback, dependencies];
		return newCallback;
	}
}

export default useCallback;
