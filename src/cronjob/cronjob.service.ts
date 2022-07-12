import { LoggingRepository } from "@/repository";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
@Injectable()
export class CronjobService {
  constructor(private loggingRepository: LoggingRepository) {}
  private readonly logger = new Logger(CronjobService.name);

  @Cron("* * 1 * *")
  async handleCron() {
    await this.loggingRepository.clear();
  }
}
