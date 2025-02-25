import path from 'path';
import fs from 'fs-extra';
import MD5 from 'md5.js';

import type { DefaultTheme } from 'vitepress/types/default-theme';

const ROOT_PATH = path.resolve(__dirname, '../../src/');

export function hashMD5(str) {
    return new MD5().update(str).digest('hex');
}

// [
//     {
//         text: '组件',
//         path: '/components/',
//     },
//     {
//         text: '博客',
//         path: 'knowledge-lib/blogs',
//     },
//     {
//         text: '浏览器',
//         path: 'knowledge-lib/browser',
//     },
//     {
//         text: 'HTML & CSS',
//         path: 'knowledge-lib/html&css',
//     },
//     {
//         text: 'JavaScript',
//         path: 'knowledge-lib/js',
//     },
//     {
//         text: 'jsAPI',
//         path: '/knowledge-lib/js/jsAPI',
//     },
// ];

type NavItem = {
    text: string;
    link: string;
    items?: NavItem[];
};

/**
 * 为不同路径生成对应的左侧边栏导航
 * 约定：path下的任和目录
 *          如果包含index.md文件，认为是叶子
 *          否则认为是子文件夹items
 *
 * 注意：vitepress sidebar最多嵌套6级
 */
export function generateSidebar(navItems: NavItem[], sidebar = {}) {
    for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];

        if (item.items && !item.link) {
            generateSidebar(item.items, sidebar);
            continue;
        }

        const key = item.link; // 去除第一个/,避免解析为绝对路径
        const value = item.text;
        const basePath = path.resolve(ROOT_PATH, key.substring(1));

        try {
            fs.statSync(basePath);
        } catch (err) {
            sidebar[key] = [
                {
                    text: value,
                    link: key,
                },
            ];
            continue;
        }

        const files = fs.readdirSync(basePath);
        const leafs = [];
        const dirs = [];

        // 遍历区分出单文档和子目录
        for (let j = 0; j < files.length; j++) {
            const filename = files[j];
            if (fs.statSync(path.resolve(basePath, filename)).isFile()) {
                // 1. 是文件，必然是叶子节点
                leafs.push(filename);
            } else if (isLeaf(path.resolve(basePath, filename))) {
                // 2. 是叶子结点的目录
                leafs.push(filename);
            } else if (!isEmpty(path.resolve(basePath, filename))) {
                // 3. 包含子项的目录
                dirs.push(filename);
            }
        }

        sidebar[key] = [];
        leafs.forEach((filename) => {
            const fn = filename.replace('.md', '');
            sidebar[key].push({
                text: fn,
                link: path.join(key, fn),
            });
        });
        dirs.forEach((filename) => {
            sidebar[key].push({
                text: filename,
                items: parseDir(path.join(key.substring(1), filename)),
            });
        });
    }

    // 如果包含index.md文件，认为是叶子
    function isLeaf(basePath: string): boolean {
        return fs.existsSync(path.resolve(basePath, 'index.md'));
    }

    // 如果目录下不含任何md文件或文件夹，则认为为空目录，应当忽略
    function isEmpty(basePath: string): boolean {
        const files = fs.readdirSync(basePath);

        for (let i = 0; i < files.length; i++) {
            const filename = files[i];
            if (
                (fs.statSync(path.resolve(basePath, filename)).isFile() && filename.endsWith('.md')) ||
                isLeaf(path.resolve(basePath, filename))
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

            const filePath = path.resolve(ROOT_PATH, basePath, filename);

            if (fs.statSync(filePath).isFile()) {
                if (filename.endsWith('.md')) {
                    items.push({
                        text: fn,
                        link: path.join(basePath, fn),
                    });
                }
            } else if (!isEmpty(filePath)) {
                if (isLeaf(filePath)) {
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

    return sidebar;
}
