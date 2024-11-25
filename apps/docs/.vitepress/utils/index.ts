import path from 'path';
import fs from 'fs-extra';

export function generateSidebar() {
    return {
        '/blogs/': [
            {
                text: '博客',
                items: fs
                    .readdirSync(path.resolve(__dirname, '../../src/blogs'))
                    .map((item) => ({ text: item, link: `/blogs/${item}` })),
            },
        ],
        '/components/': [
            {
                text: '组件',
                items: fs
                    .readdirSync(path.resolve(__dirname, '../../src/components'))
                    .map((item) => ({ text: item, link: `/components/${item}` })),
            },
        ],
        '/interview-experience/': fs
            .readdirSync(path.resolve(__dirname, '../../src/interview-experience'))
            .filter((item) => {
                return fs.statSync(path.resolve(__dirname, `../../src/interview-experience/${item}`)).isDirectory();
            })
            .map((dirName) => {
                return {
                    text: dirName,
                    items: fs
                        .readdirSync(path.resolve(__dirname, `../../src/interview-experience/${dirName}`))
                        .map((item) => ({ text: item, link: `/interview-experience/${dirName}/${item}` })),
                };
            }),
    };
}
