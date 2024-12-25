import path from 'path';
import fs from 'fs-extra';
import MD5 from 'md5.js';

const ROOT_PATH = path.resolve(__dirname, '../../src/');

export function hash(str) {
    return new MD5().update(str).digest('hex');
}

export function generateSidebar(directory: { text: string; path: string }[]) {
    const siderbar = {};

    for (let i = 0; i < directory.length; i++) {
        const item = directory[i];
        const key = item.path;
        const value = item.text;

        siderbar[key] = [
            {
                text: value,
                items: fs
                    .readdirSync(path.resolve(ROOT_PATH, key))
                    .filter((filename) => {
                        return (
                            fs.statSync(path.resolve(ROOT_PATH, key, filename)).isDirectory() ||
                            (fs.statSync(path.resolve(ROOT_PATH, key, filename)).isFile() && filename.endsWith('.md'))
                        );
                    })
                    .map((filename) => {
                        filename = filename.replace('.md', '');

                        return {
                            text: filename,
                            link: path.join(key, filename),
                        };
                    }),
            },
        ];
    }

    return siderbar;
}
