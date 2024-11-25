// useReducer 是 useState 的替代方案。当 useState 不能很好的满足需要的时候，useReducer 可能会解决我们的问题。

// 怎么做异步数据请求 https://mlog.club/article/2004488

// 保存状态的数组
let hookStates = [];
// 索引
let hookIndex = 0;

function useReducer(reducer, initialState) {
	hookStates[hookIndex] = hookStates[hookIndex] || initialState;

	let currentIndex = hookIndex;
	function dispatch(action) {
		hookStates[currentIndex] = reducer
			? reducer(hookStates[currentIndex], action)
			: action;
		// 触发视图更新
		render();
	}
	return [hookStates[hookIndex++], dispatch];
}

// useState可以使用useReducer改写
function useState(initialState) {
	return useReducer(null, initialState);
}
