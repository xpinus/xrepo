package top.xrepo.servant.module.news.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.HttpStatusCode;
import top.xrepo.servant.module.news.vo.HotNewsVO;

import java.util.ArrayList;

@Service
public class NewsService {
    private final RestClient spiderRestClient;
    private final RestClient metaMindRestClient;

    public NewsService( @Qualifier("spiderRestClient") RestClient spiderRestClient, @Qualifier("metaMindRestClient") RestClient metaMindRestClient) {
        this.spiderRestClient = spiderRestClient;
        this.metaMindRestClient = metaMindRestClient;
    }

    /**
     * 抓取新闻
     */
    public void scrape() {
        spiderRestClient.post()
                .uri(uriBuilder -> uriBuilder.path("/spider/scrape")
                        .queryParam("spiderName", "guancha")
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
    public ArrayList<HotNewsVO> generateHotNews() {
        ArrayList<HotNewsVO> result =  metaMindRestClient.get()
                .uri(uriBuilder -> uriBuilder.path("/news/hot")
                        .build())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> {
                    System.out.println("API调用失败: " + request.getURI());
                    throw new RuntimeException("API调用失败: " + response.getStatusCode());
                }).body(new ParameterizedTypeReference<ArrayList<HotNewsVO>>() {});

        return result;
    }

}
