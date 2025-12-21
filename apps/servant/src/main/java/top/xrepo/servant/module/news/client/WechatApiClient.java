package top.xrepo.servant.module.news.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import top.xrepo.servant.config.WechatConfig;
import top.xrepo.servant.module.news.client.reponse.AccessTokenResponse;

@Component
public class WechatApiClient {
    private final WechatConfig wechatConfig;
    private final RestClient wechatRestClient;

    public WechatApiClient(WechatConfig wechatConfig, @Qualifier("wechatRestClient") RestClient wechatRestClient) {
        this.wechatConfig = wechatConfig;
        this.wechatRestClient = wechatRestClient;
    }

    public AccessTokenResponse getAccessToken() {
        String response = wechatRestClient.get()
                .uri(uriBuilder -> uriBuilder.path("/cgi-bin/token")
                        .queryParam("grant_type", "client_credential")
                        .queryParam("appid", wechatConfig.getAppId())
                        .queryParam("secret", wechatConfig.getSecret())
                        .build())
                .retrieve()
                .body(String.class);

        // 解析 JSON 响应
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            AccessTokenResponse tokenResponse = objectMapper.readValue(response, AccessTokenResponse.class);

            // 检查是否有错误码
            if (tokenResponse.getErrcode() != null && tokenResponse.getErrcode() != 0) {
                throw new RuntimeException("WeChat API error: " + tokenResponse.getErrmsg() +
                                         " (code: " + tokenResponse.getErrcode() + ")");
            }

            return tokenResponse;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse WeChat access token response", e);
        }
    }


    /**
     * 获取已发布的消息列表
     */
    public String getPublishedMessages(String accessToken) {
        return wechatRestClient.post()
                .uri(uriBuilder -> uriBuilder.path("/cgi-bin/freepublish/batchget")
                        .queryParam("access_token", accessToken)
                        .build())
                .retrieve()
                .body(String.class);
    }

}
