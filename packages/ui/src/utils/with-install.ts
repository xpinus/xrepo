import type { App, Component, Plugin } from 'vue';

export const withInstall = <T extends Component>(component: T) => {
    (component as Record<string, unknown>).install = (app: App) => {

        const { name } = component;
        if(name) {
            app.component(name, component);
        }
    };
    return component as T & Plugin;
};


