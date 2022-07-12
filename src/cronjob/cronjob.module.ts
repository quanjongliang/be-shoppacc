import { RepositoryModule } from "@/repository";
import { Module } from "@nestjs/common";
import { CronjobService } from "./cronjob.service";

const providers = [CronjobService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: [...providers],
})
export class CronjobModule {}
