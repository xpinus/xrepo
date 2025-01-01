export class PullNewsDto {
    target: string;
}

export class ListDto {
    page: number;
    pageSize: number;
    prompt?: string;
}

export class FocusDto {
    uuid: string;
    status: boolean;
}
