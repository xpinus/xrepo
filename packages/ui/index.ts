import * as components from './components';
import type { App, Plugin } from 'vue';
// import './src/style/index.less';

export * from './components';

export default {
    install: function (app: App) {
        Object.values(components).forEach((component: Plugin) => {
            component.install!(app);
        });
    },
};
