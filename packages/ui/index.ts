import * as components from './components'
import type { App, Plugin } from 'vue';

export default {
    install: function(app: App) {
        Object.values(components).forEach((component: Plugin) => {
            component.install(app);
        });
    }
}