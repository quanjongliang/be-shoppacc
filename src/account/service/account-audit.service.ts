import {
  ACCOUNT_MESSAGE,
  AUDIT_MESSAGE,
  AUTH_MESSAGE,
  calculateTotalAccount,
  QUILL_LIANG_EMAIL,
  TIM_DANG_EMAIL,
} from "@/core";
import { User, ACCOUNT_STATUS, AUDIT_TYPE, Account, TAG_TYPE } from "@/entity";
import { HistoryService } from "@/history";
import { MailerService, MAILER_TEMPLATE_ENUM } from "@/mailer";
import {
  AccountRepository,
  AuditRepository,
  UserRepository,
} from "@/repository";
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
      if (user.money <= account.newPrice) {
        throw new HttpException(
          AUDIT_MESSAGE.NOT_ENOUGH,
          HttpStatus.BAD_GATEWAY
        );
      }
      const game = account.tags.find(tag=>tag.type===TAG_TYPE.GAME)
      user.money = user.money - account.newPrice;
      const listImage = account.cloundinary.map(
        (cl) => cl.secure_url || cl.url
      );
      return Promise.all([
        this.auditRepository.save({
          type: AUDIT_TYPE.ACCOUNT,
          information: { ...buyAccountDto, id: account.id ,game: game.title},
          user,
          total: account.newPrice,
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
      const cost = calculateTotalAccount(accounts);
      const newMoney = Number(user.money) - Number(cost);
      if (newMoney < 0) {
        throw new HttpException(
          `${AUDIT_MESSAGE.NOT_ENOUGH} Vui lòng kiểm tra lại.`,
          HttpStatus.BAD_GATEWAY
        );
      }
      const accountsAudit = [...accounts].map(account=>{
        const game = account.tags.find(tag=>tag.type === TAG_TYPE.GAME)
        ?.title || ''
        return {
          ...account,
          game
        }
      })
      return Promise.all([
        this.accountRepository.update(ids, {
          boughtBy: user.username,
          soldAt: new Date(),
          status: ACCOUNT_STATUS.SOLD,
        }),
        this.userRepository.save({ ...user, money: newMoney }),
        this.auditRepository.save({
          type: AUDIT_TYPE.ACCOUNT,
          information: { ...buyAccountDto, accounts
            :accountsAudit,game: accounts.map(acc=>acc.game) },
          user,
          total: cost,
        }),
        this.historyService.createHistoryBuyMultiAccount({
          accounts,
          username: user.username,
          cost,
        }),
        this.mailerService.sendBuyAccounts({
          cost,
          accounts,
          username: user.username,
          to: user.email,
        }),
        this.mailerService.sendBuyAccounts(
          {
            cost,
            accounts,
            username: user.username,
            to: TIM_DANG_EMAIL,
          },
          MAILER_TEMPLATE_ENUM.BUY_ACCOUNTS_TO_USER
        ),
      ]);
    }).catch();
  }

  async refundAccount(account: Account, user: User) {
    return this.connection.transaction(async () => {
      const buyer = await this.userRepository.findOne({
        username: account.boughtBy,
      });
      if (!buyer) throw new NotFoundException(ACCOUNT_MESSAGE.NOT_FOUND_BUYER);
      buyer.money = +buyer.money + +account.newPrice;
      const boughtBy = account.boughtBy
      account.boughtBy = null;
      account.soldAt = null;
      account.status = ACCOUNT_STATUS.AVAILABLE;
      return Promise.all([
        this.accountRepository.save(account),
        this.userRepository.save(buyer),
        this.historyService.createHistoryRefundAccount({
          account,
          boughtBy,
          user,
        }),
      ]);
    });
  }
}
