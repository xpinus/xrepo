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

        const files = fs.readdirSync(path.resolve(ROOT_PATH, key));
        const leafs = [];
        const dirs = [];

        // 遍历区分出单文档和子目录块
        for (let j = 0; j < files.length; j++) {
            const filename = files[j];
            if (fs.statSync(path.resolve(ROOT_PATH, key, filename)).isFile()) {
                leafs.push(filename);
            } else if (isLeaf(path.resolve(ROOT_PATH, key, filename))) {
                leafs.push(filename);
            } else if (!isEmpty(path.resolve(ROOT_PATH, key, filename))) {
                dirs.push(filename);
            }
        }

        siderbar[key] = [];
        leafs.forEach((filename) => {
            const fn = filename.replace('.md', '');
            siderbar[key].push({
                text: fn,
                link: path.join(key, fn),
            });
        });
        dirs.forEach((filename) => {
            siderbar[key].push({
                text: filename,
                items: parseDir(path.join(key, filename)),
            });
        });
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
        const itemWithSubs: DefaultTheme.SidebarItem[] = [];

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
                    items.push({
                        text: fn,
                        link: path.join(basePath, fn),
                    });
                } else {
                    itemWithSubs.push({
                        text: fn,
                        collapsed: true,
                        items: parseDir(path.join(basePath, filename)),
                    });
                }
            }
        }

        return [...itemWithSubs, ...items];
    }

    return siderbar;
}
