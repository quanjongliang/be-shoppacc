import { CreateAmountTransferredHistoryDto, CreateBuyAccountHistoryDto, CreateChangeRoleHistoryDto, CreateConfirmHistoryDto, CreateCreateAuditHistoryDto } from '../dto';
export declare const getHistoryChangeRoleMessage: (historyChangeRole: CreateChangeRoleHistoryDto) => string;
export declare const getHistoryAmountTransferredMessage: (historyAmountTransferrd: CreateAmountTransferredHistoryDto) => string;
export declare const getHistoryConfirmMessage: (historyConfirm: CreateConfirmHistoryDto) => string;
export declare const getHistoryCreateAuditMessage: (historyCreateAudit: CreateCreateAuditHistoryDto) => string;
export declare const getHistoryBuyAccountMessage: (historyBuyAccount: CreateBuyAccountHistoryDto) => string;
