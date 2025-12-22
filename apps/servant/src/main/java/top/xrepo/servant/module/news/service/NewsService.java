package top.xrepo.servant.module.news.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.HttpStatusCode;
import top.xrepo.servant.module.news.vo.HotNewsVO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Service
public class NewsService {
    private final RestClient spiderRestClient;
    private final RestClient metaMindRestClient;
    private final EmailService emailService;

    public NewsService( @Qualifier("spiderRestClient") RestClient spiderRestClient, @Qualifier("metaMindRestClient") RestClient metaMindRestClient, EmailService emailService) {
        this.spiderRestClient = spiderRestClient;
        this.metaMindRestClient = metaMindRestClient;
        this.emailService = emailService;
    }

    /**
     * 抓取新闻
     */
    public void scrapeHotNews() {
        spiderRestClient.post()
                .uri(uriBuilder -> uriBuilder.path("/spider/scrape_all")
                        .build())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> {
                    System.out.println("API调用失败: " + request.getURI());
                    throw new RuntimeException("API调用失败: " + response.getStatusCode());
                }).toBodilessEntity();
    }

    /**
     * 生成热点新闻
     */
    public Map<String, Object> generateHotNews() {
        ArrayList<HotNewsVO> news =  metaMindRestClient.get()
                .uri(uriBuilder -> uriBuilder.path("/news/hot")
                        .build())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> {
                    System.out.println("API调用失败: " + request.getURI());
                    throw new RuntimeException("API调用失败: " + response.getStatusCode());
                }).body(new ParameterizedTypeReference<ArrayList<HotNewsVO>>() {});

        // 获取明天的日期 yyyy-MM-dd
        String tomorrow = LocalDate.now().plusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        String fortune = metaMindRestClient.get()
                .uri(uriBuilder -> uriBuilder.path("/assistant/chat")
                        .queryParam("question", tomorrow + "的黄历，并进行50字以下总结")
                        .build())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> {
                    System.out.println("API调用失败: " + request.getURI());
                    throw new RuntimeException("API调用失败: " + response.getStatusCode());
                }).body(String.class);

        Map<String, Object> result = new HashMap<>();
        result.put("news", news);
        result.put("fortune", fortune);

        emailService.send("pinus0716@163.com", "今日热点新闻", "今日热点新闻：\n" + news + "\n\n今日黄历：" + fortune);

        return result;
    }

}
