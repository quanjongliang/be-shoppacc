import { AUDIT_TYPE } from '@/entity';
export declare enum TYPE_TRANSFER {
    PLUS = "PLUS",
    MINUS = "MINUS"
}
export declare class CreateAuditDto {
    UID: string;
    server: string;
    username: string;
    password: string;
    accountName: string;
    phone: string;
    note: string;
    auditInformation: AuditInformationDto[];
}
export declare class CreateAuditByAdminDto {
    username: string;
    typeAudit: AUDIT_TYPE;
    amountTransferred: number;
    typeTransfer: TYPE_TRANSFER;
}
export declare class AuditInformationDto {
    name: string;
    quantity: number;
    unitPrice: number;
}
