package top.xrepo.servant.module.news.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.xrepo.servant.module.news.service.NewsService;
import top.xrepo.servant.module.news.service.WechatService;
import top.xrepo.servant.module.news.vo.HotNewsVO;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;
    private final WechatService wechatService;

    public NewsController(NewsService newsService, WechatService wechatService) {
        this.newsService = newsService;
        this.wechatService = wechatService;
    }
    @RequestMapping("/test")
    public String test() {
        return wechatService.getPublishedMessages();
    }

    @GetMapping("/list")
    public String list() {
        return "list";
    }

    @GetMapping("/detail")
    public String detail() {
        String snull = null;
        snull.toString();
        return "detail";
    }

    @GetMapping("/scrape")
    public String scrape() {
        newsService.scrapeHotNews();
        return "scrape";
    }

    @GetMapping("/hot_news")
    public Map<String, Object> hotNews() {
        return newsService.generateHotNews();
    }

}
