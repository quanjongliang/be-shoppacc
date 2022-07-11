import { ApiProperty } from "@nestjs/swagger";

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
