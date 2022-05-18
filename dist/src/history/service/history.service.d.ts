import { BaseQueryResponse } from '@/core';
import { History } from '@/entity';
import { HistoryRepository } from '@/repository';
import { CreateAmountTransferredHistoryDto, CreateBuyAccountHistoryDto, CreateChangeRoleHistoryDto, CreateConfirmHistoryDto, CreateCreateAuditHistoryDto, QueryHistoryDto } from '../dto';
export declare class HistoryService {
    private historyRepository;
    constructor(historyRepository: HistoryRepository);
    createHistoryAmountTransferred(createHistory: CreateAmountTransferredHistoryDto): Promise<History>;
    createHistoryChangeStatusAudit(createHistory: CreateConfirmHistoryDto): Promise<History>;
    createHistoryCreateAudit(createHistory: CreateCreateAuditHistoryDto): Promise<History>;
    createHistoryChangeRole(createHistory: CreateChangeRoleHistoryDto): Promise<History>;
    createHistoryBuyAccount(createHistory: CreateBuyAccountHistoryDto): Promise<History>;
    queryHistory(queryHistory: QueryHistoryDto): Promise<BaseQueryResponse<History>>;
}
