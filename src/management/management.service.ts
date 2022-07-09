import { ACCOUNT_STATUS, HISTORY_TYPE } from "@/entity";
import { AccountRepository, HistoryRepository } from "@/repository";
import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { getRangeDateDefault } from "./common";
import { QueryManagementDto, QueryManagementResult } from "./dto";

@Injectable()
export class ManagementService {
  constructor(
    private accountRepository: AccountRepository,
    private historyRepository: HistoryRepository
  ) {}
  async getManagementAccount(
    queryManagement: QueryManagementDto
  ): Promise<QueryManagementResult> {
    let rangeDate = queryManagement;
    if (!queryManagement.startDate || !queryManagement.endDate) {
      rangeDate = getRangeDateDefault();
    }
    const countSold = await this.accountRepository
      .createQueryBuilder("account")
      .where(
        `account.status = '${ACCOUNT_STATUS.SOLD}' and account.isDeleted = false`
      )
      .andWhere(
        `account.soldAt BETWEEN '${rangeDate.startDate}' AND '${rangeDate.endDate}'`
      )
      .getCount();
    const countCreated = await this.accountRepository
      .createQueryBuilder("account")
      .where(` account.isDeleted = false`)
      .andWhere(
        `account.createdAt BETWEEN '${rangeDate.startDate}' AND '${rangeDate.endDate}'`
      )
      .getCount();
    const listRefund = await this.historyRepository.query(
      `select "accountRefund" from history h where  h."createdAt" BETWEEN  '${rangeDate.startDate}' AND '${rangeDate.endDate}' and h."type"  ='REFUND_ACCOUNT' group by h."accountRefund"  `
    );
    return {
      countSold,
      countCreated,
      countRefund: listRefund.length,
    };
  }
}
