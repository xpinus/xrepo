package top.xrepo.servant.module.news.vo;

import java.util.ArrayList;

/**
 * 大模型生成的热点新闻
 */
public class HotNewsVO {
    private String summary;
    private ArrayList<String> cites;

    public String getSummary() {
        return summary;
    }
    public void setSummary(String summary) {
        this.summary = summary;
    }
    public ArrayList<String> getCites() {
        return cites;
    }
    public void setCites(ArrayList<String> cites) {
        this.cites = cites;
    }
}
