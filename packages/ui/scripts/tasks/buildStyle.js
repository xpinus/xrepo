import { src, dest } from 'gulp';
import { ROOT_PATH, PKG_OUTPUT } from '../utils/index.js';

import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export function buildStyle() {
    const plugins = [autoprefixer(), cssnano()];

    return src(`${ROOT_PATH}/src/**/**.less`)
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(dest(`${PKG_OUTPUT}`));
}
