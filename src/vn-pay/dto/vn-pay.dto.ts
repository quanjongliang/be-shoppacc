import { BANK_CODE } from "@/entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateVnPayDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  bankCode: string;
  @ApiProperty()
  orderInfo: string;
  @ApiProperty()
  orderType: string;
  @ApiProperty()
  language: string;
  @ApiProperty()
  ipAddress: string;
}

export class VnpQueryDto {
  @ApiProperty()
  @ApiPropertyOptional()
  amount: number;
  bankCode: BANK_CODE;
  id: number;
  ipAddress: string;
  responseCode: string;
  vnp_SecureHash: string;
}
