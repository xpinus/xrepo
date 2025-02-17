import { h, createApp, ref } from 'vue';
import { ElDialog } from 'element-plus';

export default function renderDialog(componet, props, dialogOptions) {
    const componetRef = ref(null);

    const visible = ref(true);
    /**
     * 利用h函数渲染组件为虚拟节点, 函数式组件写法，当有其它响应式数据很有用起到effect效果
     * type: 组件/元素类型
     * propsOrChildren
     * children: 子元素
     */
    const renderComponet = () =>
        h(
            ElDialog,
            { ...dialogOptions, modelValue: visible.value, onClosed: afterClose },
            {
                default: () =>
                    h(componet, {
                        ref: componetRef,
                        ...props,
                        close: closeDialog,
                    }),
            },
        );

    const app = createApp(renderComponet); // 组件内的组件可能存在未定义问题，最好手动导入
    const el = document.createElement('div');
    document.body.appendChild(el);
    app.mount(el);

    function afterClose() {
        app.unmount();
        el.remove();
    }

    function closeDialog() {
        visible.value = false;
    }

    return {
        close: closeDialog,
        instance: componetRef,
    };
}
