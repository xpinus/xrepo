import handler from './handlers/index.js';

export default function reactive(target) {
    return new Proxy(target, handler);
}
