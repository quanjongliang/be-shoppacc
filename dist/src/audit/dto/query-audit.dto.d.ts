import { BaseQuery } from '@/core';
import { AUDIT_STATUS } from '@/entity';
export declare class QueryAuditDto extends BaseQuery {
    status?: AUDIT_STATUS;
}
