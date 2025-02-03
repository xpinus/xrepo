// 给fetch添加超时功能
// hoc高阶函数
function createFetchWithTimeout(timeout) {
    return function (url, options) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
    }
}