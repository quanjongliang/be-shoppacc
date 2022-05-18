import { Audit } from '../audit';
import { BaseColumn } from '../base';
export declare const AUDIT_INFORMATION_TABLE_NAME = "auditInformation";
export declare class AuditInformation extends BaseColumn {
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
    audit: Audit;
    calculateTotal(): void;
}
