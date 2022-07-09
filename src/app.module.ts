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
import { RedisModule } from './redis/redis.module';
import { VnPayModule } from '@/vn-pay';

@Module({
  imports: [
    DatabaseModule,
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
    RedisModule,
    VnPayModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },],
})
export class AppModule {}
