import { calculateTotalAccount, formatCurrencyVietNam } from "@/core";
import { Account, ACCOUNT_STATUS } from "@/entity";
import { AccountRepository, HistoryRepository } from "@/repository";
import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import {
  addDateToDate,
  getRangeDateDefault,
  getStartAndEndOfDate,
} from "./common";
import { QueryManagementDto } from "./dto";
@Injectable()
export class ManagementService {
  constructor(
    private accountRepository: AccountRepository,
    private historyRepository: HistoryRepository
  ) {}
  async getManagementAccount(queryManagement: QueryManagementDto) {
    let rangeDate = queryManagement;
    if (!queryManagement.startDate || !queryManagement.endDate) {
      rangeDate = getRangeDateDefault();
    } else {
      rangeDate.startDate = new Date(queryManagement.startDate);
      rangeDate.endDate = new Date(queryManagement.endDate);
      rangeDate.endDate.setHours(23, 59, 59, 999);
      rangeDate.startDate.setHours(0, 0, 0, 0);
    }
    const data = [];
    let turnOver = 0;

    while (rangeDate.startDate.getTime() <= rangeDate.endDate.getTime()) {
      const { startDate, endDate } = getStartAndEndOfDate(rangeDate.startDate);
      const start = startDate.toISOString();
      const end = endDate.toISOString();
      const [countCreated, accountsSold, countRefund] = await Promise.all([
        this.getTotalCreatedByDate(start, end),
        this.getAccountsSoldByDate(start, end),
        this.getTotalRefundByDate(start, end),
      ]);
      const accountTotalPrice = calculateTotalAccount(accountsSold);
      turnOver += +accountTotalPrice;
      data.push({
        label: moment(rangeDate.startDate).format("DD/MM/YYYY"),
        data: {
          countCreated,
          countSold: accountsSold.length,
          countRefund,
        },
      });
      rangeDate.startDate = addDateToDate(rangeDate.startDate);
    }

    const [remainingAccounts, soldAccounts] = await Promise.all([
      this.accountRepository.count({
        where: { isDeleted: false, status: ACCOUNT_STATUS.AVAILABLE },
      }),
      this.accountRepository.count({
        where: {
          isDeleted: false,
          status: ACCOUNT_STATUS.SOLD,
        },
      }),
    ]);

    return {
      data,
      turnOver: formatCurrencyVietNam(turnOver),
      remainingAccounts,
      soldAccounts,
    };
  }

  async getTurnOverByRange(startDate: string, endDate: string) {
    const accountsSold = await this.accountRepository
      .createQueryBuilder("account")
      .where(
        `account.status = '${ACCOUNT_STATUS.SOLD}' and account.isDeleted = false`
      )
      .andWhere(`account.soldAt BETWEEN '${startDate}' AND '${endDate}'`)
      .getMany();
    return calculateTotalAccount(accountsSold);
  }

  async getAccountsSoldByDate(
    startDate: string,
    endDate: string
  ): Promise<Account[]> {
    return this.accountRepository
      .createQueryBuilder("account")
      .where(
        `account.status = '${ACCOUNT_STATUS.SOLD}' and account.isDeleted = false`
      )
      .andWhere(`account.soldAt BETWEEN '${startDate}' AND '${endDate}'`)
      .getMany();
  }

  async getTotalCreatedByDate(
    startDate: string,
    endDate: string
  ): Promise<number> {
    return this.accountRepository
      .createQueryBuilder("account")
      .where(` account.isDeleted = false`)
      .andWhere(`account.createdAt BETWEEN '${startDate}' AND '${endDate}'`)
      .getCount();
  }

  async getTotalRefundByDate(
    startDate: string,
    endDate: string
  ): Promise<number> {
    const listRefund = await this.historyRepository.query(
      `select "accountRefund" from history h where  h."createdAt" BETWEEN  '${startDate}' AND '${endDate}' and h."type"  ='REFUND_ACCOUNT' group by h."accountRefund"  `
    );
    return listRefund.length;
  }
}
