export declare class BaseQuery {
    limit?: number;
    offset?: number;
}
export declare class BaseQueryResponse<T> {
    data: T[];
    total: number;
}
