import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { RepositoryModule } from '@/repository';

@Module({
  imports:[RepositoryModule],
  controllers: [ManagementController],
  providers: [ManagementService]
})
export class ManagementModule {}
