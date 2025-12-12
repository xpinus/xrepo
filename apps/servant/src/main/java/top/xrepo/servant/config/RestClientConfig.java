package top.xrepo.servant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .build();
    }

    @Bean
    public RestClient spiderRestClient() {
        return RestClient.builder()
                .baseUrl("http://127.0.0.1:6001/api/")
                .build();
    }

    @Bean
    public RestClient wechatRestClient() {
        return RestClient.builder()
                .baseUrl("https://api.weixin.qq.com/")
                .build();
    }
}
