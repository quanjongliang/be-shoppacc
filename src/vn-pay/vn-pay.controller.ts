import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateVnPayDto, VnpQueryDto } from "./dto";
import { VnPayService } from "./vn-pay.service";

@ApiTags("vn-pay")
@Controller("vn-pay")
export class VnPayController {
  constructor(private vnPayService: VnPayService) {}

  @Post()
  async createVnPay(@Body() vnpDto: CreateVnPayDto, @Res() res: Response) {
    const redirectUrl = await this.vnPayService.createVnPay(vnpDto);
    res.send(redirectUrl);
  }

  @Get()
  async vnPayReturn(@Query() vnpReturn: VnpQueryDto) {
    return this.vnPayService.returnVnPay(vnpReturn);
  }
}
