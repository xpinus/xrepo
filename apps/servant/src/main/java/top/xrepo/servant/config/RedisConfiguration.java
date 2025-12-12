package top.xrepo.servant.config;

import com.alibaba.fastjson2.support.spring6.data.redis.GenericFastJsonRedisSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisConfiguration {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 使用 String 序列化方式，序列化 KEY
        redisTemplate.setKeySerializer(RedisSerializer.string());

        // 使用 JSON 序列化方式（FastJson2），序列化 VALUE 。
        redisTemplate.setValueSerializer(new GenericFastJsonRedisSerializer());

        return redisTemplate;
    }
}
