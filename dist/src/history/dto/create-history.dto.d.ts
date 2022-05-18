import { Account } from '@/entity';
export interface CreateChangeRoleHistoryDto {
    admin: string;
    username: string;
    oldRole: string;
    newRole: string;
}
export declare abstract class CreateAmountTransferredHistoryDto {
    admin: string;
    username: string;
    oldMoney: number;
    newMoney: number;
}
export declare abstract class CreateCreateAuditHistoryDto {
    username: string;
    UID: string;
}
export declare abstract class CreateConfirmHistoryDto extends CreateCreateAuditHistoryDto {
    admin: string;
}
export declare abstract class CreateBuyAccountHistoryDto {
    username: string;
    account: Account;
}
