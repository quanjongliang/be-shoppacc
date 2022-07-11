import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateVnPayDto } from "./dto";
import { VnPayService } from "./vn-pay.service";

@ApiTags("vn-pay")
@Controller("vn-pay")
export class VnPayController {
  constructor(private vnPayService: VnPayService) {}

  @Post()
  async createVnPay(@Body() vnpDto: CreateVnPayDto, @Res() res: Response) {
    const redirectUrl = this.vnPayService.createVnPay(vnpDto);
    res.redirect(redirectUrl);
  }
}
