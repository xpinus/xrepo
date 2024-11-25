let lastRef;

// 跨渲染取到状态值
// 获取dom ref
// https://blog.csdn.net/u011705725/article/details/115634265
// createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用lastRef
function useRef(value) {
	lastRef = lastRef || { current: value };
	return lastRef;
}
