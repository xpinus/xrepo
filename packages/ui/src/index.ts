import type { App } from 'vue';

import XButton from './components/button';

const components = [XButton];

export function install(app: App) {
    components.forEach((component: any) => {
        app.component(component.name, component);
    });
}

export default {
    install,
};

export { XButton };
