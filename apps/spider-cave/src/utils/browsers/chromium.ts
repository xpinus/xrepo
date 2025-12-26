import type { Browser, BrowserContext, Locator } from "playwright";
import { spawn } from "child_process";
import { chromium } from "playwright-extra";
import { sleep } from "@/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stealth = require("puppeteer-extra-plugin-stealth");
chromium.use(stealth());

export class ChromiumBrowserConnection {
    exe_file = process.env.DEBUG_BROWSER_EXE;
    exe_cwd = process.env.DEBUG_BROWSER_EXE_CWD;
    port = process.env.DEBUG_BROWSER_PORT || 9222;
    static #instance: ChromiumBrowserConnection;

    context: BrowserContext;

    constructor() {
        // 防止通过 new 多次实例化
        if (new.target !== ChromiumBrowserConnection) {
            throw new Error("🈲 Cannot instantiate directly!");
        }
    }

    static getInstance() {
        if (!ChromiumBrowserConnection.#instance) {
            const instance = new ChromiumBrowserConnection();
            instance.openBrowser().then(async (ws) => {
                console.log("🔗 connect to: " + ws);
                const browser = await chromium.connectOverCDP(ws);
                const defaultContext = browser.contexts()[0];
                defaultContext.setDefaultTimeout(1000 * 60 * 10);
                defaultContext.setDefaultNavigationTimeout(1000 * 60 * 10);
                // 关闭历史打开的页面，只保留一个空白页面
                const existingPages = defaultContext.pages();
                if (existingPages.length > 1) {
                    // 保留第一个页面，关闭其他页面
                    const pagesToClose = existingPages.slice(1);
                    await Promise.all(pagesToClose.map((page) => page.close()));

                    // 清空保留页面的内容
                    await existingPages[0].goto("about:blank");
                } else if (existingPages.length === 1) {
                    // 如果只有一个页面，清空其内容
                    await existingPages[0].goto("about:blank");
                }

                instance.context = defaultContext;
                console.log("✅ debug browser has connected");
            });
            ChromiumBrowserConnection.#instance = instance;
        }

        return ChromiumBrowserConnection.#instance;
    }

    /**
     * 打开debug浏览器
     */
    openBrowser(): Promise<string> {
        console.log("🖥️ 启动浏览器: " + this.exe_file);
        return new Promise((resolve, reject) => {
            const child = spawn(
                this.exe_file,
                [`--remote-debugging-port=${this.port}`, "--user-data-dir=C:\\Users\\pinus\\Documents\\chrome-debug-profile"],
                {
                    shell: true,
                    cwd: this.exe_cwd,
                },
            );

            child.on("spawn", () => {
                console.log("🌐 浏览器已打开");
            });

            child.stderr.on("data", (data) => {
                const str: string = data.toString();
                // console.warn("stderr1：", str, str.includes("DevTools"));
                if (str.includes("DevTools")) {
                    // TODO 必须关闭先关闭浏览器，否则获取不到地址
                    const index = str.indexOf("ws://");
                    const ws = str.substring(index);
                    resolve(ws);
                }
            });
        });
    }

    /**
     * 连接浏览器网页
     * @param website
     */
    async connect(website = "https://www.bing.com") {
        let retry = 3;
        await sleep(100);
        while (retry--) {
            if (!this.context) {
                await sleep(2000);
                continue;
            }

            return this.openPage(website);
        }
    }

    /**
     * 打开网页
     * @param url 网页地址
     * @returns
     */
    async openPage(url: string) {
        if (!this.context) {
            throw new Error("⛓️‍💥 未连接到浏览器");
        }
        const page = await this.context.newPage();
        await page.goto(url);
        console.log("📑 页面已打开：" + url);
        return page;
    }

    getPage(index = 0) {
        return this.context.pages()[index];
    }

    // 替换元素的 HTML
    async replaceHTML(locator: Locator, newHTML) {
        await locator.evaluate((element, html) => {
            element.innerHTML = html;
        }, newHTML);
    }

    // 在元素后插入 HTML
    async insertAfter(locator: Locator, newHTML) {
        await locator.evaluate((element, html) => {
            element.insertAdjacentHTML("afterend", html);
        }, newHTML);
    }

    // 在元素前插入 HTML
    async insertBefore(locator: Locator, newHTML) {
        await locator.evaluate((element, html) => {
            element.insertAdjacentHTML("beforebegin", html);
        }, newHTML);
    }

    async scrollIntoView(locator: Locator) {
        await locator.evaluate((element) => {
            console.log(element);
            element.scrollIntoView();
        });
    }
}
