import React from "react";

const hookStates = [];
const hookIndex = 0;

function useMemo(fn, dependencies) {
	if (hookStates[hookIndex]) {
		const [lastResult, lastDependencies] = hookStates[hookIndex];

		const same = dependencies.every(
			(item, index) => item === lastDependencies[index]
		);

		if (same) {
			hookIndex++;
			return lastResult;
		} else {
			const newResult = fn();
			hookStates[hookIndex++] = [newResult, dependencies];
			return newResult;
		}
	} else {
		// 第一次调用
		let newResult = fn();
		hookStates[hookIndex++] = [newResult, dependencies];
		return newResult;
	}
}

export default useMemo;
