import path from 'path';
import fs from 'fs-extra';

const COMPONENTS_PATH = path.resolve(__dirname, '../../components');

export function getComponentsMenu() {


    const components = fs
        .readdirSync(path.resolve(__dirname, COMPONENTS_PATH))
        .map((component) => {

            // 读取目录下index.md的第一行，解析出标题
            const title = fs.readFileSync(path.resolve(__dirname, `${COMPONENTS_PATH}/${component}/index.md`), 'utf-8').split('\n')[0].replace('#', '').trim();

            return {
                text: title,
                link: `/components/${component}`,
            };
        });

    components.sort((a, b) => a.text.localeCompare(b.text))

    return  [
        {
            text: '组件',
            items: components
        }
    ]
}
