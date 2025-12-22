import * as cheerio from "cheerio";

export class BingSearchEngine {
    static async search(q: string) {
        const response = await fetch(`https://cn.bing.com/search?q=${encodeURIComponent(q)}`, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
            },
        }).then((res) => res.text());

        const $ = cheerio.load(response);

        return response;
    }
}
