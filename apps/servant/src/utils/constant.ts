export enum Language {
    CHINESE = 'zh', // 中文
    ENGLISH = 'en', // 英语
    SPANISH = 'es', // 西班牙语
    ARABIC = 'ar', // 阿拉伯语
    HINDI = 'hi', // 印地语
    BENGALI = 'bn', // 孟加拉语
    PORTUGUESE = 'pt', // 葡萄牙语
    RUSSIAN = 'ru', // 俄语
    JAPANESE = 'ja', // 日语
    GERMAN = 'de', // 德语
    KOREAN = 'ko', // 韩语
    FRENCH = 'fr', // 法语
    TURKISH = 'tr', // 土耳其语
    ITALIAN = 'it', // 意大利语
    URDU = 'ur', // 乌尔都语
    PERSIAN = 'fa', // 波斯语
    POLISH = 'pl', // 波兰语
    UKRAINIAN = 'uk', // 乌克兰语
    MALAY = 'ms', // 马来语
    VIETNAMESE = 'vi', // 越南语
    NORWEGIAN = 'no', // 挪威语
    HUNGARIAN = 'hu', // 匈牙利语
}

export enum SpiderStatus {
    IDLE = 'idle', // 空闲
    PENDING = 'pending', // 等待
    RUNNING = 'running', // 运行中
    ERROR = 'error', // 失败
}

export enum WebSocketEvent {
    REFRESH = 'refresh',
}

export enum ApiStatus {
    IDLE = 0,
    BUSY = 1,
    INVALID = 2,
}
