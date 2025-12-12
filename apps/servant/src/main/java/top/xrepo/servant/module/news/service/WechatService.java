package top.xrepo.servant.module.news.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class WechatService {
    public final RestClient wechatRestClient;
    public WechatService(@Qualifier("wechatRestClient") RestClient wechatRestClient) {
        this.wechatRestClient = wechatRestClient;
    }
}
