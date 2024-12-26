import path from 'path';
import fs from 'fs-extra';
import MD5 from 'md5.js';

import type { DefaultTheme } from 'vitepress/types/default-theme';

const ROOT_PATH = path.resolve(__dirname, '../../src/');

export function hashMD5(str) {
    return new MD5().update(str).digest('hex');
}

/**
 * 为不同路径生成对应的左侧边栏导航
 * 约定：path下的任和目录
 *          如果不包含index.md文件，认为是叶子
 *          否则认为是子文件夹items
 *
 * 注意：vitepress sidebar最多嵌套6级
 * @param directory
 */
export function generateSidebar(directory: { text: string; path: string }[]) {
    const siderbar = {};

    for (let i = 0; i < directory.length; i++) {
        const item = directory[i];
        const key = item.path;
        const value = item.text;

        siderbar[key] = [
            {
                text: value,
                items: parseDir(key),

                // fs
                // .readdirSync(path.resolve(ROOT_PATH, key))
                // .filter((filename) => {
                //     return (
                //         fs.statSync(path.resolve(ROOT_PATH, key, filename)).isDirectory() ||
                //         (fs.statSync(path.resolve(ROOT_PATH, key, filename)).isFile() && filename.endsWith('.md'))
                //     );
                // })
                // .map((filename) => {
                //     filename = filename.replace('.md', '');
                //
                //
                //
                //     return {
                //         text: filename,
                //         link: path.join(key, filename),
                //     } as DefaultTheme.SidebarItem;
                // }),
            },
        ];
    }

    // 如果包含index.md文件，认为是叶子
    function isLeaf(basePath: string): boolean {
        return fs.existsSync(path.resolve(ROOT_PATH, basePath, 'index.md'));
    }

    // 如果目录下不含任何md文件或文件夹，则认为为空目录，应当忽略
    function isEmpty(basePath: string): boolean {
        const files = fs.readdirSync(path.resolve(ROOT_PATH, basePath));

        for (let i = 0; i < files.length; i++) {
            const filename = files[i];
            if (
                (fs.statSync(path.resolve(ROOT_PATH, basePath, filename)).isFile() && filename.endsWith('.md')) ||
                isLeaf(path.resolve(ROOT_PATH, basePath, filename))
            ) {
                return false;
            }
        }

        return true;
    }

    function parseDir(basePath: string): DefaultTheme.SidebarItem[] {
        const files = fs.readdirSync(path.resolve(ROOT_PATH, basePath));

        const items: DefaultTheme.SidebarItem[] = [];

        for (let i = 0; i < files.length; i++) {
            const filename = files[i];
            const fn = filename.replace('.md', '');

            if (fs.statSync(path.resolve(ROOT_PATH, basePath, filename)).isFile()) {
                if (filename.endsWith('.md')) {
                    items.push({
                        text: fn,
                        link: path.join(basePath, fn),
                    });
                }
            } else if (!isEmpty(path.join(basePath, filename))) {
                if (isLeaf(path.join(basePath, filename))) {
                    console.log(path.join(basePath, filename));

                    items.push({
                        text: fn,
                        link: path.join(basePath, fn),
                    });
                } else {
                    items.push({
                        text: fn,
                        items: parseDir(path.join(basePath, filename)),
                    });
                }
            }
        }

        return items;
    }

    return siderbar;
}
