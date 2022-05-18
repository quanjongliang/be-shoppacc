import { BaseQuery } from '@/core';
import { USER_ROLE } from '@/entity';
export declare class QueryUserDto extends BaseQuery {
    role?: USER_ROLE;
    username?: string;
}
