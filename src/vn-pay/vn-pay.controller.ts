import { CurrentUser, JwtAuthGuard } from "@/auth";
import { User } from "@/entity";
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateVnPayDto, VnpQueryDto } from "./dto";
import { VnPayService } from "./vn-pay.service";

@ApiTags("vn-pay")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("vn-pay")
export class VnPayController {
  constructor(private vnPayService: VnPayService) {}

  @Post()
  async createVnPay(
    @Body() vnpDto: CreateVnPayDto,
    @Res() res: Response,
    @CurrentUser() user: User
  ) {
    const redirectUrl = await this.vnPayService.createVnPay(vnpDto, user);
    res.send(redirectUrl);
  }

  @Get()
  async vnPayReturn(@Query() vnpReturn: VnpQueryDto) {
    return this.vnPayService.returnVnPay(vnpReturn);
  }
}
