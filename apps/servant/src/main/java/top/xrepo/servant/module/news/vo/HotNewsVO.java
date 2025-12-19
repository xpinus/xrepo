package top.xrepo.servant.module.news.vo;

/**
 * 大模型生成的热点新闻
 */
public class HotNewsVO {
    private String title;
    private String value;

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "HotNewsVO{" +
                "title='" + title + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
