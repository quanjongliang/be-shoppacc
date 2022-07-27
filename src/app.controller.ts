import { CloundinaryService } from "@/cloudinary";
import { MailerService } from "@/mailer";
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CronExpression } from "@nestjs/schedule";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { AppService } from "./app.service";
import { CurrentUser, JwtAuthGuard } from "./auth";
import { CronjobService } from "./cronjob/cronjob.service";
import { ACCOUNT_RELATION, User } from "./entity";
import { RedisCacheService } from "./redis/redis.service";
import { AccountRepository, TagRepository, TransactionRepository } from "./repository";
import * as crypto from "crypto";
import { decryptValue, encryptText } from "./util/crypto-hash";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailerService: MailerService,
    private cloundinaryService: CloundinaryService,
    // private redisService: RedisCacheService,
    private cronjobService: CronjobService,
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository,
    private tagRepostiory: TagRepository
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // return this.driverService.uploadFile(file);
    return this.cloundinaryService.uploadFile(file);
  }

  @Delete(":publicId")
  deleteFile(@Param("publicId") publicId: string) {
    return this.cloundinaryService.deleteFile(publicId);
  }

  @Post("send-mail")
  sendMail() {
    // return this.mailerService.sendWelcomeMail(
    //   'lhongquan.1998@gmail.com',
    //   'Quill',
    // );
    return this.mailerService.sendResetPasswordMail({
      to: "lhongquan.1998@gmail.com",
      token: "ASDASDASDAS",
      username: "username",
    });
  }

  @Get("excel")
  async getDataExcel() {
    return this.appService.getDataFromExcel();
  }

  @Patch("slug")
  async updateSlugPost() {
    return this.appService.updateSlugPost();
  }

  @Post("json-weapon")
  async getWeaponFromJson() {
    return this.appService.getWeaponJsonFile();
  }

  @Get("test-redis")
  async testGetRedis() {
    // const result = await this.redisService.get("hello");
    // if (!result) {
    //   await this.redisService.set("hello", "Quan dep trai");
    //   return "Quan dep trai k co redis";
    // }
    // return result;
    return 'quan'
    // const tag = await this.tagRepostiory.findOne({id:'4f23c5bf-1383-4c70-a0d4-d118950a2ac7'})
    // const accounts = await this.accountRepository.find({relations:[ACCOUNT_RELATION.TAG]})
    // const promises = accounts.map(account=>{
    //   this.accountRepository.save({...account,tags:[...account.tags,tag],game:tag.slug})
    // })
    // await Promise.all(promises)
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post("action-cron")
  async actionCron(@Req() req: Request, @CurrentUser() user: User) {
    try {
      console.log(user);
      const transaction = await this.transactionRepository.save(
        this.transactionRepository.create({ user })
      );
      const description = `NAP${transaction.id}`;
      const { isStop = false } = req.body;
      if (isStop) {
        this.cronjobService.deleteCron(description);
      } else {
        const start = new Date();
        const expired = new Date(start.getTime() + 10 * 60 * 1000);
        this.cronjobService.addInterval(
          description,
          2 * 60 * 1000,
          start,
          expired,
          transaction.id
        );
        // this.cronjobService.addCronJob(
        //   description,
        //   CronExpression.EVERY_30_SECONDS,
        //   start,
        //   expired,
        //   transaction.id
        // );
      }
      return description;
    } catch (error) {
      console.log(`error : ${error.message}`);
    }
  }
}
