import BaseSpider from './BaseSpider';
import { spawn } from 'child_process';
import { chromium } from 'playwright-extra';

// import stealth from 'puppeteer-extra-plugin-stealth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

export default abstract class ConnectSpider extends BaseSpider {
  exeName: string = 'chrome.exe';
  exePath: string = 'C:/Program Files/Google/Chrome/Application/';

  setExe(name: string, cwd: string) {
    this.exeName = name;
    this.exePath = cwd;
  }

  openBrowser() {
    return new Promise((resolve, reject) => {
      const child = spawn(
        this.exeName,
        ['--remote-debugging-port=9222', this.website],
        {
          shell: true,
          cwd: this.exePath,
        },
      );

      child.on('spawn', () => {
        console.log('启动成功');
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });

      child.stderr.on('data', (data) => {
        const str: string = data.toString();
        console.error(str);
      });
    });
  }

  async pull() {
    console.log(`---开始爬取 ${this.name} : ${this.website}---`);

    await this.openBrowser();

    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const defaultContext = browser.contexts()[0];
    defaultContext.setDefaultTimeout(1000 * 60 * 60);
    defaultContext.setDefaultNavigationTimeout(1000 * 60 * 60);
    const page = defaultContext.pages()[0];

    // 拉取新闻
    const newsList = await this._pull(page, defaultContext);

    // ---------------------
    await defaultContext.close();
    await browser.close();

    return newsList;
  }
}
