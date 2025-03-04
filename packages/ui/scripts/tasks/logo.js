import { ROOT_PATH } from '../utils/index.js';

export function logo(cb) {
    let logo =
        '\n' +
        '     __  __                       _   _ ___ \n' +
        '     \\ \\/ /_ __ ___ _ __   ___   | | | |_ _|\n' +
        "      \\  /| '__/ _ \\ '_ \\ / _ \\  | | | || | \n" +
        '      /  \\| | |  __/ |_) | (_) | | |_| || | \n' +
        '     /_/\\_\\_|  \\___| .__/ \\___/   \\___/|___|\n' +
        '                   |_|                      \n';

    console.log('#############################################################################');
    console.log(logo);
    console.log('#############################################################################');

    cb();
}
