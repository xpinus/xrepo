import type { App } from 'vue';

import XButton from './components/button';
import XHighlight from './components/highlight';
import XMedia from './components/media';

const components = [XButton, XHighlight, XMedia];

export function install(app: App) {
    components.forEach((component: any) => {
        app.component(component.name, component);
    });
}

export default {
    install,
};

export { XButton, XHighlight, XMedia };
