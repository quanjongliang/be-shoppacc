import { BaseQuery } from '@/core';
export declare class QueryPostDto extends BaseQuery {
    slug?: string;
}
export declare class QueryPostTagDto extends QueryPostDto {
    tag?: string;
}
