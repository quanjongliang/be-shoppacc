import { formatCurrencyVietNam } from "@/core";
import { TRANSACTION_RELATIONS, TRANSACTION_STATUS } from "@/entity";
import { HistoryService } from "@/history";
import { MailerService } from "@/mailer";
import {
  LoggingRepository,
  TransactionRepository,
  UserRepository,
} from "@/repository";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { Connection } from "typeorm";
import * as crypto from "crypto";
import { BankTransaction } from "./interface";
import { getApiBank } from "@/util/crypto-hash";
@Injectable()
export class CronjobService {
  constructor(
    private loggingRepository: LoggingRepository,
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    private transactionRepository: TransactionRepository,
    private userRepository: UserRepository,
    private mailerService: MailerService,
    private historySerice: HistoryService,
    private connection: Connection
  ) {}
  private readonly logger = new Logger(CronjobService.name);

  @Cron("* * 1 * *")
  async handleCron() {
    await this.loggingRepository.clear();
  }

  // @Cron(CronExpression.EVERY_5_SECONDS, {
  //   name: 'notifications',
  // })
  // triggerNotifications(text:string) {
  //   console.log(`hello + ${text}`)
  // }

  async addCronJob(
    name: string,
    expression: CronExpression,
    start: Date,
    expired: Date,
    id: number
  ) {
    const job = new CronJob(expression, async () => {
      const date = new Date();
      console.log("compare: ", start.getTime() >= expired.getTime());
      if (date.getTime() >= expired.getTime()) {
        const transaction = await this.transactionRepository.findOne({
          where: { id, isDeleted: false },
          relations: [TRANSACTION_RELATIONS.USER],
        });
        // checkcondition
        transaction.status = TRANSACTION_STATUS.EXPIRED;
        await Promise.all([
          this.transactionRepository.save({
            ...transaction,
            tempestDescription: name,
          }),
        ]);
        this.logger.debug("Expired");
        this.deleteCron(name);
      } else {
        const api = getApiBank();
        this.httpService.get(api).subscribe(
          async (res) => {
            const { transactions = [], status = false } = res.data;
            const transactionById: BankTransaction | undefined = [
              ...transactions,
            ].find((transaction) =>
              transaction.description.toLowerCase().includes(name.toLowerCase())
            );
            if (transactionById) {
              const transaction = await this.transactionRepository.findOne({
                where: { id, isDeleted: false },
                relations: [TRANSACTION_RELATIONS.USER],
              });
              //  check condition transaction and user
              transaction.status = TRANSACTION_STATUS.SUCCESS;
              const user = transaction.user;
              user.money =
                Number(user.money) + Number(transactionById?.amount || 0);
              await this.connection.transaction(async () => {
                await Promise.all([
                  this.transactionRepository.save({
                    ...transaction,
                    ...transactionById,
                    tempestDescription: name,
                  }),
                  this.userRepository.save({ ...user }),
                  this.mailerService.sendNotifyPayment(user, {
                    ...transactionById,
                    amount: transactionById?.amount,
                  }),
                  this.historySerice.createHistoryTransactionPayment({
                    user,
                    ...transactionById,
                  }),
                ]);
              });
              this.deleteCron(name);
            } else {
              this.logger.warn(`time (${expression}) for job ${name} to run!`);
              this.logger.warn(`start (${start}) to ${expired} to run!`);
            }
          },
          async (err) => {
            console.log(err.message);
            const transaction = await this.transactionRepository.findOne({
              where: { id, isDeleted: false },
              relations: [TRANSACTION_RELATIONS.USER],
            });
            await this.transactionRepository.save({
              ...transaction,
              status: TRANSACTION_STATUS.ERROR,
              tempestDescription: name,
            });
            this.deleteCron(name);
          }
        );
      }
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${expression} seconds!`
    );
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = "error: next fire date is in the past!";
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
  checkExistCronByName(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    return job ? true : false;
  }
  addInterval(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }
}
