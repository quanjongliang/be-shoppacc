import { RepositoryModule } from "@/repository";
import { Module } from "@nestjs/common";
import { DriveEntityService, DriveService } from "./services";

const providers = [DriveService, DriveEntityService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class DriveModule {}
