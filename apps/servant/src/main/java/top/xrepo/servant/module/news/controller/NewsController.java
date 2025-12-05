package top.xrepo.servant.module.news.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/news")
public class NewsController {

    @GetMapping("/list")
    public String list() {
        return "list";
    }

    @GetMapping("/detail")
    public String detail() {
        String snull = null;
        snull.toString();
        return "detail";
    }
}
