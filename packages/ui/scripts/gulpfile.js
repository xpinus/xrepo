import { parallel, series } from 'gulp';
import { withTaskName, run, runTask } from './utils/index.js';

export * from './tasks/index.js';

export default series(
    runTask('logo'),
    withTaskName('clean', () => run('pnpm run clean')),
    parallel(
        runTask('buildStyle'),
        withTaskName('buildComponent', () => run('pnpm run build:vite')),
    ),
);
