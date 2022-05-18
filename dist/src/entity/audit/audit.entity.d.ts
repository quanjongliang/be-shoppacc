import { AuditInformation } from '../audit-information';
import { BaseColumn } from '../base';
import { User } from '../user';
export declare const AUDIT_TABLE_NAME = "audit";
export declare enum AUDIT_STATUS {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}
export declare enum AUDIT_TYPE {
    COIN = "COIN",
    STONE = "STONE"
}
export declare const AUDIT_RELATION: {
    USER: string;
    AUDIT_INFORMATIONS: string;
};
export declare class Audit extends BaseColumn {
    user: User;
    UID: string;
    server: string;
    username: string;
    password: string;
    accountName: string;
    phone: string;
    note: string;
    total: number;
    status: AUDIT_STATUS;
    type: AUDIT_TYPE;
    auditInformations: AuditInformation[];
    calculateTotal(): void;
}
