import { DriveModule } from "@/drive";
import { HistoryModule } from "@/history";
import { MailerModule } from "@/mailer";
import { RepositoryModule } from "@/repository";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { CronjobService, ServiceVpsService } from "./services";

const providers = [CronjobService, ServiceVpsService];

@Module({
  imports: [
    RepositoryModule,
    HttpModule,
    MailerModule,
    HistoryModule,
    ScheduleModule.forRoot(),
    DriveModule
  ],
  providers,
  exports: [...providers],
})
export class CronjobModule {}
