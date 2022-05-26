import { ACCOUNT_MESSAGE, AUDIT_MESSAGE, TIM_DANG_EMAIL } from "@/core";
import { User, ACCOUNT_STATUS, AUDIT_TYPE } from "@/entity";
import { HistoryService } from "@/history";
import { MailerService, MAILER_TEMPLATE_ENUM } from "@/mailer";
import {
  AccountRepository,
  AuditRepository,
  UserRepository,
} from "@/repository";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { BuyAccountDto } from "../dto";

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

  async buyAccountByUser(user: User, id: string, buyAccountDto: BuyAccountDto) {
    return this.connection.transaction(async () => {
      const account = await this.accountRepository.checkExistAccount(id);
      if (account.status === ACCOUNT_STATUS.SOLD || account.soldAt) {
        throw new HttpException(ACCOUNT_MESSAGE.SOLD, HttpStatus.BAD_GATEWAY);
      }
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
          information: { ...buyAccountDto, id },
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
}
