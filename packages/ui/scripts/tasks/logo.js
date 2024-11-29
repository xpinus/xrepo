import { ROOT_PATH } from '../utils/index.js';

export function logo(cb) {
    let logo =
        '\n' +
        ' __     __          _______                   _    _ _____ \n' +
        ' \\ \\   / /         |___  / |                 | |  | |_   _|\n' +
        '  \\ \\_/ /   _ _ __    / /| |__   ___  _   _  | |  | | | |  \n' +
        "   \\   / | | | '_ \\  / / | '_ \\ / _ \\| | | | | |  | | | |  \n" +
        '    | || |_| | | | |/ /__| | | | (_) | |_| | | |__| |_| |_ \n' +
        '    |_| \\__,_|_| |_/_____|_| |_|\\___/ \\__,_|  \\____/|_____|\n' +
        '                                                           \n' +
        '                                                           \n';
    console.log('#############################################################################');
    console.log(logo);
    console.log('#############################################################################');

    cb();
}
