import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "@/database";
import { MailerModule } from "@/mailer";
import { RepositoryModule } from "@/repository";
import { AuthModule } from "@/auth";
import { AccountModule } from "@/account";
import { PostModule } from "@/post";
import { TagModule } from "@/tag";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinaryModule } from "@/cloudinary";
import { AuditModule } from "@/audit";
import { HistoryModule } from "@/history";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./util";
import { VnPayModule } from "@/vn-pay";
import { ManagementModule } from "./management/management.module";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { CronjobModule } from "./cronjob/cronjob.module";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MailerModule,
    RepositoryModule,
    AuthModule,
    PostModule,
    TagModule,
    AccountModule,
    MulterModule,
    CloudinaryModule,
    AuditModule,
    HistoryModule,
    VnPayModule,
    ManagementModule,
    ScheduleModule.forRoot(),
    CronjobModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
