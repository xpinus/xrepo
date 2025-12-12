package top.xrepo.servant.module.news.scheduler;

// TODO 优化方向：https://cloud.tencent.com/developer/article/2599327

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import top.xrepo.servant.module.news.service.NewsService;

@Component
public class HotNewsGenerateScheduler {

    private final Logger logger = LoggerFactory.getLogger(HotNewsGenerateScheduler.class);
    private final NewsService newsService;

    public HotNewsGenerateScheduler(NewsService newsService) {
        this.newsService = newsService;
    }

    /**
     * 每日15:00:00 生成热点新闻
     */
    @Scheduled(cron = "0 0 15 * * ?")
    public void generate() {
        logger.info("开始生成热点新闻");
        newsService.generateHotNews();
    }
}
