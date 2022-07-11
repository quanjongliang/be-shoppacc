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
import { ManagementModule } from "./management/management.module";
import { BullModule } from "@nestjs/bull";
import { MessageProducerService } from "./mesage-producer/mesage-producer.service";
import { MessageConsumer } from "./mesage-producer/mesage-consumer";
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
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "message-queue",
    }),
    AuditModule,
    HistoryModule,
    ManagementModule,
  ],
  controllers: [AppController],
  providers: [
    MessageProducerService,
    MessageConsumer,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
