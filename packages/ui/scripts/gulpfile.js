import { parallel, series } from 'gulp';
import { withTaskName, run, runTask } from './utils/index.js';

export * from './tasks/index.js';

export default series(
    runTask('logo'),
    withTaskName('clean', () => run('npm run clean')),
    parallel(
        runTask('buildStyle'),
        withTaskName('buildComponent', () => run('npm run build:vite')),
    ),
);
