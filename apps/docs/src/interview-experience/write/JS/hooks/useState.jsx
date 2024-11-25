import React from "react";

// 通过一个数组来保存每次调用产生的state
const stateList = [];
const stateIndex = 0;

function useState(initialState) {
	stateList[stateIndex] = stateList[stateIndex] || initialState;

	let currentIndex = stateIndex;
	function setState(newState) {
		if (typeof newState === "function") {
			newState = newState(stateList[stateIndex]);
		}
		stateList[currentIndex] = newState;

		// 触发视图gengxin
		render();
	}

	return [stateList[stateIndex++], setState];
}

export default useState;
