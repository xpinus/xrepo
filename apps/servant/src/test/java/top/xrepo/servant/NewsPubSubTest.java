package top.xrepo.servant;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NewsPubSubTest {
    public static final String NEWS_TOPIC = "NEWS";

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Test
    public void testSub() throws InterruptedException {
        stringRedisTemplate.convertAndSend(NEWS_TOPIC, "hello world");
    }
}
