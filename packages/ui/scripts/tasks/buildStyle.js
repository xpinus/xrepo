import { src, dest } from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import { ROOT_PATH, PKG_OUTPUT } from '../utils/index.js';

export function buildStyle() {
    return src(`${ROOT_PATH}/src/**/style/**.less`)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(dest(`${PKG_OUTPUT}/lib/src`))
        .pipe(dest(`${PKG_OUTPUT}/es/src`))
        .pipe(dest(`${PKG_OUTPUT}/umd/src`));
}
