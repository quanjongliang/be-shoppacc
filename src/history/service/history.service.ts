import { BaseQueryResponse, DEFAULT_CONFIG } from "@/core";
import { History, HISTORY_TYPE } from "@/entity";
import { HistoryRepository } from "@/repository";
import { Injectable } from "@nestjs/common";
import {
  CreateAmountTransferredHistoryDto,
  CreateBuyAccountHistoryDto,
  CreateBuyMultiAccountHistoryDto,
  CreateChangeRoleHistoryDto,
  CreateConfirmHistoryDto,
  CreateCreateAuditHistoryDto,
  QueryHistoryDto,
} from "../dto";
import {
  getHistoryAmountTransferredMessage,
  getHistoryBuyAccountMessage,
  getHistoryBuyMultiAccountMessage,
  getHistoryChangeRoleMessage,
  getHistoryConfirmMessage,
  getHistoryCreateAuditMessage,
} from "../util";

@Injectable()
export class HistoryService {
  constructor(private historyRepository: HistoryRepository) {}

  async createHistoryAmountTransferred(
    createHistory: CreateAmountTransferredHistoryDto
  ): Promise<History> {
    const historyMessage = getHistoryAmountTransferredMessage(createHistory);
    return this.historyRepository.save(
      this.historyRepository.create({
        historyMessage,
        type: HISTORY_TYPE.AMOUNT_TRANSFERRED,
        information: JSON.stringify(createHistory),
      })
    );
  }
  async createHistoryChangeStatusAudit(
    createHistory: CreateConfirmHistoryDto
  ): Promise<History> {
    const historyMessage = getHistoryConfirmMessage(createHistory);
    return this.historyRepository.save(
      this.historyRepository.create({
        historyMessage,
        type: HISTORY_TYPE.CHANGE_STATUS_AUDIT,
        information: JSON.stringify(createHistory),
      })
    );
  }
  async createHistoryCreateAudit(
    createHistory: CreateCreateAuditHistoryDto
  ): Promise<History> {
    const historyMessage = getHistoryCreateAuditMessage(createHistory);
    return this.historyRepository.save(
      this.historyRepository.create({
        historyMessage,
        type: HISTORY_TYPE.CREATE_AUDIT,
        information: JSON.stringify(createHistory),
      })
    );
  }
  async createHistoryChangeRole(
    createHistory: CreateChangeRoleHistoryDto
  ): Promise<History> {
    const historyMessage = getHistoryChangeRoleMessage(createHistory);
    return this.historyRepository.save(
      this.historyRepository.create({
        historyMessage,
        type: HISTORY_TYPE.CHANGE_ROLE,
        information: JSON.stringify(createHistory),
      })
    );
  }

  async createHistoryBuyAccount(
    createHistory: CreateBuyAccountHistoryDto
  ): Promise<History> {
    const historyMessage = getHistoryBuyAccountMessage(createHistory);
    return this.historyRepository.save(
      this.historyRepository.create({
        historyMessage,
        type: HISTORY_TYPE.BUY_ACCOUNT_BY_USER,
        information: JSON.stringify(createHistory),
      })
    );
  }

  async createHistoryBuyMultiAccount(
    createHistory: CreateBuyMultiAccountHistoryDto
  ): Promise<History> {
    const historyMessage = getHistoryBuyMultiAccountMessage(createHistory);
    return this.historyRepository.save(
      this.historyRepository.create({
        historyMessage,
        type: HISTORY_TYPE.BUY_ACCOUNT_BY_USER,
        information: JSON.stringify(createHistory),
      })
    );
  }

  async queryHistory(
    queryHistory: QueryHistoryDto
  ): Promise<BaseQueryResponse<History>> {
    const { offset = DEFAULT_CONFIG.OFFSET, limit = DEFAULT_CONFIG.LIMIT } =
      queryHistory;
    const findHistoryQuery = this.historyRepository
      .createQueryBuilder("history")
      .offset(offset)
      .limit(limit)
      .orderBy("history.createdAt", "DESC");
    const [total, data] = await Promise.all([
      this.historyRepository.count(),
      findHistoryQuery.getMany(),
    ]);
    return { total, data };
  }
}
