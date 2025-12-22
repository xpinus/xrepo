import { IsString, Matches } from "class-validator";

export class HuangLiDto {
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "date 格式必须为 YYYY-MM-DD",
    })
    date: string;
}

export class WechatArticleDto {
    @IsString()
    content: string;
}
