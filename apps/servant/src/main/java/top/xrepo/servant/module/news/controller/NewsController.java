package top.xrepo.servant.module.news.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.xrepo.servant.module.news.service.NewsService;

@RestController
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
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
        newsService.scrape();
        return "scrape";
    }

}
