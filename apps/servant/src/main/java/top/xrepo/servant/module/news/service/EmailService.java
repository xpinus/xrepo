package top.xrepo.servant.module.news.service;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;
import top.xrepo.servant.module.news.client.WechatApiClient;
import top.xrepo.servant.module.news.client.reponse.AccessTokenResponse;

import java.util.concurrent.TimeUnit;

@Service
public class EmailService {
    @Resource
    private JavaMailSender mailSender;

    private final String EMALI_FROM = "servant<1270309892@qq.com>";

    public void send(String to, String subject, String content) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(EMALI_FROM);
        message.setTo(to);
        message.setSubject(subject); // 标题
        message.setText(content);
        mailSender.send(message);

        System.out.println("邮件发送成功");
    }
}
