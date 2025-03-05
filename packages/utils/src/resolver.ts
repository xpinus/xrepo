/**
 * 组件库自动导入
 */
export function XrepoUIResolver() {
    return {
        type: 'component',
        resolve: (name: string) => {
            if (name.startsWith('X')) {
                const componentName = name.slice(1).toLowerCase();
                const from = `@xrepo/ui/dist/es/src/components/${componentName}/index.mjs`;

                return {
                    name: name,
                    from,
                    sideEffects: [
                        '@xrepo/ui/dist/theme/index.css',
                        `@xrepo/ui/dist/components/${componentName}/${componentName}.css`,
                    ],
                };
            }
        },
    };
}
