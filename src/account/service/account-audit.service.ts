import { ACCOUNT_MESSAGE, AUDIT_MESSAGE, TIM_DANG_EMAIL } from "@/core";
import { User, ACCOUNT_STATUS, AUDIT_TYPE, Account } from "@/entity";
import { HistoryService } from "@/history";
import { MailerService, MAILER_TEMPLATE_ENUM } from "@/mailer";
import {
  AccountRepository,
  AuditRepository,
  UserRepository,
} from "@/repository";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { BuyAccountDto, BuyMultiAccountDto } from "../dto";

@Injectable()
export class AccountAuditService {
  constructor(
    private auditRepository: AuditRepository,
    private accountRepository: AccountRepository,
    private historyService: HistoryService,
    private userRepository: UserRepository,
    private connection: Connection,
    private mailerService: MailerService
  ) {}

  async buyAccountByUser(
    user: User,
    account: Account,
    buyAccountDto: BuyAccountDto
  ) {
    return this.connection.transaction(async () => {
      account.status = ACCOUNT_STATUS.SOLD;
      account.soldAt = new Date();
      account.boughtBy = user.username;
      if (user.money < account.newPrice) {
        throw new HttpException(
          AUDIT_MESSAGE.NOT_ENOUGH,
          HttpStatus.BAD_GATEWAY
        );
      }
      user.money = user.money - account.newPrice;
      const listImage = account.cloundinary.map(
        (cl) => cl.secure_url || cl.url
      );
      return Promise.all([
        this.auditRepository.save({
          type: AUDIT_TYPE.ACCOUNT,
          information: { ...buyAccountDto, id: account.id },
          user,
        }),
        this.userRepository.save(user),
        this.accountRepository.save(account),
        this.mailerService.sendBuyAccountFromUser({
          to: TIM_DANG_EMAIL,
          account,
          username: user.username,
          listImage,
        }),
        this.mailerService.sendBuyAccountFromUser(
          {
            to: user.email,
            account,
            username: user.username,
            listImage,
          },
          MAILER_TEMPLATE_ENUM.BUY_ACCOUNT_TO_USER
        ),
        this.historyService.createHistoryBuyAccount({
          account,
          username: user.username,
        }),
      ]);
    });
  }

  async buyMultiAccountByUser(
    user: User,
    accounts: Account[],
    buyMutiAccountDto: BuyMultiAccountDto
  ) {
    return this.connection.transaction(async () => {
      const { ids, ...buyAccountDto } = buyMutiAccountDto;
      console.log(user);
      console.log(accounts);
      console.log(buyMutiAccountDto);
      const cost = accounts.reduce(
        (total, account) => total + account.newPrice,
        0
      );

      const newMoney = +user.money - cost;
      return Promise.all([
        this.accountRepository.update(ids, {
          boughtBy: user.username,
          soldAt: new Date(),
          status: ACCOUNT_STATUS.SOLD,
        }),
        this.userRepository.save({ ...user, money: newMoney }),
        this.auditRepository.save({
          type: AUDIT_TYPE.ACCOUNT,
          information: { ...buyAccountDto, accounts },
          user,
        }),
        this.historyService.createHistoryBuyMultiAccount({
          accounts,
          username: user.username,
          cost,
        }),
      ]);
    });
  }
}
