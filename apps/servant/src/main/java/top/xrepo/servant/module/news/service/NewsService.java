package top.xrepo.servant.module.news.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.HttpStatusCode;
import top.xrepo.servant.module.news.vo.HotNewsVO;

import java.util.ArrayList;

@Service
public class NewsService {
    private final RestClient spiderRestClient;

    public NewsService( @Qualifier("spiderRestClient") RestClient spiderRestClient) {
        this.spiderRestClient = spiderRestClient;
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
        // TODO  生成热点新闻，将新闻写入mysql

        HotNewsVO hotNewsVO = new HotNewsVO();
        hotNewsVO.setSummary("这是热点新闻的摘要");
        hotNewsVO.setCites(new ArrayList<>() {{
            add("观察者网");
        }});

        return new ArrayList<>() {{
            add(hotNewsVO);
        }};
    }

}
