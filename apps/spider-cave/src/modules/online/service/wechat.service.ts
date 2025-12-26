import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";
import { ChromiumBrowserConnection } from "@/utils/browsers/chromium";
import type { BrowserContext, Page } from "playwright";
import { Cron } from "@nestjs/schedule";

import { HotNewsArticleDto } from "../dto/online.dto";
import { sleep } from "@/utils";

const WE_CHAT_HOME = "https://mp.weixin.qq.com/";

@Injectable()
export class WechatService {
    private browserConn: ChromiumBrowserConnection;
    private busy = false;
    private page: Page;
    constructor() {
        this.browserConn = ChromiumBrowserConnection.getInstance();
        this.browserConn
            .connect(WE_CHAT_HOME)
            .then((page) => {
                this.page = page;
            })
            .catch((e) => {
                console.error(e);
            });
    }

    /**
     * 定时刷新页面，防止token过期
     */
    @Cron("0 0 * * * *")
    updatePage() {
        if (this.busy) return;
        this.page.goto(WE_CHAT_HOME);
    }

    // 判断是否登录
    isLogin() {
        return true;
    }

    /**
     * 自动化发布微信文章：个人账号无法调用api
     */
    async publishHotNews(content: HotNewsArticleDto) {
        this.busy = true;
        try {
            await this.page.goto(WE_CHAT_HOME);
            if (!this.isLogin()) {
                console.error("请先登录微信");
                return;
            }
            console.log(content);

            // 打开草稿箱
            await this.page.getByTitle("内容管理").click();
            await this.page.getByTitle("草稿箱").click();
            // 写新文章  打开编辑页
            const pagePromise = this.browserConn.context.waitForEvent("page");
            await this.page
                .locator(".weui-desktop-card__inner")
                .filter({ has: this.page.getByText("新的创作") })
                .hover();
            await this.page.getByTitle("图文消息").click();
            const editPage = await pagePromise;
            // 选择模板
            await editPage.locator("#js_editor_inserttemplate").click();
            await editPage
                .locator(".weui-desktop-media__list .weui-desktop-card")
                .filter({ has: editPage.getByText("60s天下事") })
                .click();
            await editPage.getByText("添加到正文").click();

            // 编辑文章
            await editPage.locator("#title").fill("今日新闻热点" + new Date().toLocaleDateString());
            await editPage.locator("#author").fill("山君談");
            const newsLocator = editPage.getByText("<%news%>");
            for (const { title, value } of content.news) {
                // 插入标题
                await this.browserConn.insertBefore(
                    newsLocator,
                    `
<section style="margin-left: 8px;margin-right: 8px;">
  <span style="background-color: rgba(115, 250, 121, .3);padding: 2px 6px;border-radius: 4px;">
    <strong>${title}</strong>
  </span>
</section>
              `,
                );
                if (title.trim() !== value.trim()) {
                    // 插入详情
                    await this.browserConn.insertBefore(
                        newsLocator,
                        `
<section style="text-indent: 1em;">
  <span style="font-size: 16px;color: rgb(136, 136, 136);">${value}</span>
</section>
              `,
                    );
                }
            }
            await this.browserConn.replaceHTML(newsLocator, "");
            await this.browserConn.replaceHTML(editPage.getByText("<%fortune%>"), content.fortune);

            // 选择封面
            await sleep(2000);
            await editPage.locator("#js_cover_area").scrollIntoViewIfNeeded();
            await editPage.locator("#js_cover_area").hover();
            console.log("2");
            await editPage.locator("#js_cover_null .js_imagedialog").click();
            await editPage.getByText("60s.png").click();
            await editPage.getByText("下一步").click();
            await editPage.getByRole("button", { name: "确认" }).click();

            // 原创声明
            await sleep(500);
            await editPage.getByText("未声明").scrollIntoViewIfNeeded();
            await editPage.getByText("未声明").click();
            const agreeLocator = editPage.locator(".claim__original-dialog .weui-desktop-dialog__ft .weui-desktop-icon-checkbox");
            await agreeLocator.isVisible();
            await sleep(3000);
            if (
                !(await editPage.locator('.claim__original-dialog .weui-desktop-dialog__ft input[type="checkbox"]').isChecked())
            ) {
                await agreeLocator.click();
            }
            await editPage.getByRole("button", { name: "确定" }).click();

            // 合集
            await sleep(500);
            await editPage.locator("#js_article_tags_area .allow_click_opr").scrollIntoViewIfNeeded();
            await editPage.locator("#js_article_tags_area .allow_click_opr").click();
            await sleep(1000);
            await editPage.locator(".setting-select input.weui-desktop-form__input").click();
            await editPage
                .locator(".select-opt-li")
                .filter({
                    hasText: "60s天下事",
                })
                .click();
            await editPage.getByRole("button", { name: "确认" }).click();

            // 创作来源
            await sleep(500);
            await editPage.locator("#js_claim_source_area .allow_click_opr").click();
            await sleep(1000);
            await editPage.getByText("内容由AI生成").click();
            await editPage.getByRole("button", { name: "确认" }).click();

            // 保存
            await editPage.getByRole("button", { name: "保存为草稿" }).click();
            await sleep(5000);
            await editPage.close();
        } catch (_) {
        } finally {
            this.busy = false;
        }
    }
}
