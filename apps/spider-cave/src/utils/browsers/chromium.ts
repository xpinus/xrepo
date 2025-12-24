import type { Browser, BrowserContext } from "playwright";
import { spawn } from "child_process";
import { chromium } from "playwright-extra";
import { singleton } from "@/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stealth = require("puppeteer-extra-plugin-stealth");
chromium.use(stealth());

export class ChromiumBrowserConnection {
    exe_file = process.env.DEBUG_BROWSER_EXE;
    exe_cwd = process.env.DEBUG_BROWSER_EXE_CWD;
    port = process.env.DEBUG_BROWSER_PORT || 9222;
    website: string = "https://www.baidu.com";
    context: BrowserContext;

    constructor() {}

    get connected() {
        return !!this.context;
    }

    childLog(str: string) {
        console.log(str);
    }

    openBrowser() {
        return new Promise((resolve, reject) => {
            const child = spawn(
                this.exe_file,
                [
                    `--remote-debugging-port=${this.port}`,
                    "--user-data-dir=C:\\Users\\pinus\\Documents\\chrome-debug-profile",
                    this.website,
                ],
                {
                    shell: true,
                    cwd: this.exe_cwd,
                },
            );

            child.on("spawn", () => {
                console.log("浏览器启动中...");
            });

            child.stderr.on("data", (data) => {
                const str: string = data.toString();
                console.warn("stderr1：", str, str.includes("DevTools"));
                if (str.includes("DevTools")) {
                    const index = str.indexOf("ws://");
                    const ws = str.substring(index);
                    console.log("xx: ", ws);
                    resolve(ws);
                }
            });
        });
    }

    async connect() {
        console.log("启动浏览器: " + this.exe_file);
        const ws = await this.openBrowser();

        console.log("connect浏览器");
        const browser = await chromium.connectOverCDP(ws);
        const defaultContext = browser.contexts()[0];
        defaultContext.setDefaultTimeout(1000 * 60 * 60);
        defaultContext.setDefaultNavigationTimeout(1000 * 60 * 60);
        this.context = defaultContext;
    }

    getPage(index = 0) {
        return this.context.pages()[index];
    }
}
