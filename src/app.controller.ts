import { MailerService } from "@/mailer";
import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  Patch,
  UseInterceptors,
  Param,
  Res,
  Req,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { AppService } from "./app.service";
import { CloundinaryService } from "@/cloudinary";
import { RedisCacheService } from "./redis/redis.service";
import { Request } from "express";
import { CronjobService } from "./cronjob/cronjob.service";
import { CronExpression } from "@nestjs/schedule";
import { randomUUID } from "crypto";
import { CurrentUser, JwtAuthGuard } from "./auth";
import { User } from "./entity";
import { TransactionRepository } from "./repository";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailerService: MailerService,
    private cloundinaryService: CloundinaryService,
    private redisService: RedisCacheService,
    private cronjobService: CronjobService,
    private transactionRepository: TransactionRepository
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
    const result = await this.redisService.get("hello");
    if (!result) {
      await this.redisService.set("hello", "Quan dep trai");
      return "Quan dep trai k co redis";
    }
    return result;
  }
  @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Post("action-cron")
  async actionCron(@Req() req: Request, @CurrentUser() user:User){
    try {
      console.log(user)
      const transaction = await this.transactionRepository.save(this.transactionRepository.create({user}))
      const description = `NAP Genshin ${transaction.id}`
      const {isStop=false}=req.body
    if(isStop){
      this.cronjobService.deleteCron(description)
    } else {
      const start = new Date()
      const expired = new Date(start.getTime() + 20*1000)
      this.cronjobService.addCronJob(description,CronExpression.EVERY_5_SECONDS,start,expired,transaction.id)
    }
    return description
    } catch (error) {
     console.log(`error : ${error.message}`) 
    }
  }
}
