import { ACCOUNT_MESSAGE, AUDIT_MESSAGE, calculateTotalAccount } from "@/core";
import { Account, ACCOUNT_RELATION, ACCOUNT_STATUS } from "@/entity";
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { EntityRepository, In, Repository } from "typeorm";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async checkExistAccount(id: string): Promise<Account> {
    const account = await this.findOne({
      where: { id },
      relations: [ACCOUNT_RELATION.CLOUNDINARY],
    });
    if (!account) throw new NotFoundException(ACCOUNT_MESSAGE.NOT_FOUND);
    return account;
  }

  async checkCanActionAccount(
    id: string,
    isBuy = false,
    money?: number
  ): Promise<Account> {
    const account = await this.findOne({
      where: { id },
      relations: [
        ACCOUNT_RELATION.TAG,
        ACCOUNT_RELATION.CLOUNDINARY,
        ACCOUNT_RELATION.USER,
      ],
    });
    if (!account) {
      throw new HttpException(ACCOUNT_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (account.status === ACCOUNT_STATUS.SOLD || account.soldAt) {
      throw new HttpException(ACCOUNT_MESSAGE.SOLD, HttpStatus.BAD_GATEWAY);
    }
    if (isBuy && account.newPrice > money) {
      throw new BadRequestException(AUDIT_MESSAGE.NOT_ENOUGH);
    }
    return account;
  }

  async checkCanActionAccounts(
    ids: string[],
    isBuy = false,
    money?: number
  ): Promise<Account[]> {
    const accounts = await this.find({
      where: { id: In(ids) },
      relations: [
        ACCOUNT_RELATION.TAG,
        ACCOUNT_RELATION.CLOUNDINARY,
        ACCOUNT_RELATION.USER,
      ],
    });
    if (accounts.length === 0) {
      throw new HttpException(ACCOUNT_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (accounts.some((account) => account.soldAt)) {
      throw new BadRequestException(ACCOUNT_MESSAGE.CAN_NOT_BEHAVIOR);
    }
    const total = calculateTotalAccount(accounts)
    if (isBuy && Number(total) > Number(money)) {
      throw new BadRequestException(`${AUDIT_MESSAGE.NOT_ENOUGH} Kiểm tra Smile Coin của bạn nhé.`);
    }
    return accounts;
  }
}
