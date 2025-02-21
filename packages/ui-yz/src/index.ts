import type { App } from 'vue';

import YzButton from './components/button';
import YzRadioBar from './components/radioBar';
import YzBreadcrumb from './components/breadcrumb';
import YzLayout from './components/layout';

const components = [YzButton, YzRadioBar, YzBreadcrumb, YzLayout];

export function install(app: App) {
    components.forEach((component: any) => {
        app.component(component.name, component);
    });
}

export default {
    install,
};

export { YzButton, YzRadioBar, YzBreadcrumb, YzLayout };
