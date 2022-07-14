import { TRANSACTION_RELATIONS, TRANSACTION_STATUS } from "@/entity";
import { HistoryService } from "@/history";
import { MailerService } from "@/mailer";
import { LoggingRepository, TransactionRepository, UserRepository } from "@/repository";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
@Injectable()
export class CronjobService {
  constructor(private loggingRepository: LoggingRepository
    ,
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    private transactionRepository:TransactionRepository,
    private userRepository: UserRepository,
    private mailerService: MailerService,
    private historySerice: HistoryService
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
  

async addCronJob(name: string, expression: CronExpression,start:Date,expired:Date,id:number) {
  const job = new CronJob(expression, async() => {
    const date = new Date()
    console.log('compare: ' , start.getTime()>=expired.getTime())
    if(date.getTime()>=expired.getTime()){
          const transaction = await this.transactionRepository.findOne({where:{id,isDeleted:false},relations:[TRANSACTION_RELATIONS.USER]})
          // checkcondition
          transaction.status = TRANSACTION_STATUS.EXPIRED
          await Promise.all([
            this.transactionRepository.save({...transaction}),
            this.mailerService.sendNotifyPayment(transaction.user)
          ])
          this.logger.debug('Expired')
      this.deleteCron(name)
    }else{
      this.httpService.get('https://api.web2m.com/historyapimbv3/Tempestgenshinvu812/78989899992/E397C0CB-80E8-9E26-6A53-A5397E9B9903').subscribe( async res=>{
        console.log(res.data?.transactions)
        const {transactions=[]} = res.data
        const transactionById = [...transactions].find(transaction=>transaction.description.includes(name))
        if(transactionById){
          console.log('Success')
          console.log(transactionById)
          const transaction = await this.transactionRepository.findOne({where:{id,isDeleted:false},relations:[TRANSACTION_RELATIONS.USER]})
//  check condition transaction and user
          transaction.status= TRANSACTION_STATUS.SUCCESS
          const user = transaction.user
          user.money = user.money + +transactionById?.amount
          await Promise.all([
      this.transactionRepository.save({...transaction,...transactionById}) ,
            this.userRepository.save({...user}),
            this.mailerService.sendNotifyPayment(user,true),
            this.historySerice.createHistoryTransactionPayment({user,...transactionById})
          ])
          this.deleteCron(name)
        } else {
          console.log('chua dc')
          this.logger.warn(`time (${expression}) for job ${name} to run!`);
          this.logger.warn(`start (${start}) to ${expired} to run!`);
        }
      })
     
    }
  });

  this.schedulerRegistry.addCronJob(name, job);
  job.start();

  this.logger.warn(
    `job ${name} added for each minute at ${expression} seconds!`,
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
      next = 'error: next fire date is in the past!';
    }
    this.logger.log(`job: ${key} -> next: ${next}`);
  });
}
checkExistCronByName(name:string){
  const job = this.schedulerRegistry.getCronJob(name)
  return job ? true : false
}
addInterval(name: string, milliseconds: number) {
  const callback = () => {
    this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
  };

  const interval = setInterval(callback, milliseconds);
  this.schedulerRegistry.addInterval(name, interval);
}


}
