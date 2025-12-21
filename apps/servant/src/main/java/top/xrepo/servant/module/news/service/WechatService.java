package top.xrepo.servant.module.news.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import top.xrepo.servant.module.news.client.WechatApiClient;
import top.xrepo.servant.module.news.client.reponse.AccessTokenResponse;

import java.util.concurrent.TimeUnit;

@Service
public class WechatService {
    public final WechatApiClient wechatApiClient;
    private final StringRedisTemplate stringRedisTemplate;

    // 微信 access_token 缓存 key
    private static final String WECHAT_ACCESS_TOKEN_KEY = "wechat:access_token";
    // 微信 access_token 有效期（秒），提前5分钟过期
    private static final long TOKEN_EXPIRE_OFFSET = 300L;

    public WechatService(WechatApiClient wechatApiClient, StringRedisTemplate stringRedisTemplate) {
        this.wechatApiClient = wechatApiClient;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    /**
     * 获取微信 access_token
     */
    public String getAccessToken() {
        // 先从 尝试从 Redis 缓存中获取
        String accessToken = stringRedisTemplate.opsForValue().get(WECHAT_ACCESS_TOKEN_KEY);
        if (accessToken != null && !accessToken.isEmpty()) {
            // 缓存中有有效的 access_token，直接返回
            return accessToken;
        }

        // 缓存中没有，调用接口获取新的 access_token
        AccessTokenResponse response = wechatApiClient.getAccessToken();
        accessToken = response.getAccessToken();

        // 将新获取的 access_token 存入 Redis 缓存
        if (accessToken != null && !accessToken.isEmpty()) {
            // 设置过期时间，微信默认7200秒，这里提前5分钟过期
            stringRedisTemplate.opsForValue().set(WECHAT_ACCESS_TOKEN_KEY, accessToken,
                    7200 - TOKEN_EXPIRE_OFFSET, TimeUnit.SECONDS);
        }

        return accessToken;
    }

    /**
     * 获取已发布的消息列表
     */
    public String getPublishedMessages() {
        return wechatApiClient.getPublishedMessages(getAccessToken());
    }
}
