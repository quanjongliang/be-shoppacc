import { HistoryModule } from "@/history";
import { MailerModule } from "@/mailer";
import { RepositoryModule } from "@/repository";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CronjobService } from "./cronjob.service";

const providers = [CronjobService];

@Module({
  imports: [RepositoryModule,HttpModule,MailerModule,HistoryModule],
  providers,
  exports: [...providers],
})
export class CronjobModule {}
