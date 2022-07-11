import { MailerService } from "@/mailer";
import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Patch,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { AppService } from "./app.service";
import { CloundinaryService } from "@/cloudinary";
import { MessageProducerService } from "./mesage-producer/mesage-producer.service";
import { UserRepository } from "./repository";
import { Not } from "typeorm";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailerService: MailerService,
    private cloundinaryService: CloundinaryService,
    readonly messageProducerService: MessageProducerService,
    private userRepository: UserRepository
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

  @Post("send-mails")
  async sendMailToUser(@Query("msg") msg: string) {
    const users = await this.userRepository.find({
      where: { isDeleted: false },
    });
    this.messageProducerService.sendMessage(users);
    console.log("asdasdas");
  }
}
