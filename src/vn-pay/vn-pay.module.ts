import { Module } from '@nestjs/common';
import { VnPayService } from './vn-pay.service';
import { VnPayController } from './vn-pay.controller';

@Module({
  providers: [VnPayService],
  controllers: [VnPayController]
})
export class VnPayModule {}
