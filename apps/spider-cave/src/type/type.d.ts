// 从网站上爬取的数据
type NewsInfo = {
    title: string;
    desc: string;
    url: string;
    tag: string[];
};

type NewsItem = NewsInfo & {
    language: string;
    country: string;
    source: string;
    source_href: string;
};

type NewsDoc = NewsItem & {
    zh_title: string;
    zh_desc: string;
    en_title: string;
    en_desc: string;
    content: string;
};

type PickPartial<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>> & Partial<Pick<T, U>>;
