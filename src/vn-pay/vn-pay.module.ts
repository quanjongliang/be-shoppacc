import { Module } from "@nestjs/common";
import { VnPayService } from "./vn-pay.service";
import { VnPayController } from "./vn-pay.controller";
import { RepositoryModule } from "@/repository";

@Module({
  imports: [RepositoryModule],
  providers: [VnPayService],
  controllers: [VnPayController],
})
export class VnPayModule {}
