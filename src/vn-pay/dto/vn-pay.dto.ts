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
  vnp_Amount: number;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_BankCode: BANK_CODE;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_BankTranNo: string;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_CardType: string;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_OrderInfo: string;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_PayDate: number;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_ResponseCode: string;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_TmnCode: string;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_TransactionNo: number;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_TransactionStatus: string;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_TxnRef: number;
  @ApiProperty()
  @ApiPropertyOptional()
  vnp_SecureHash: string;
}
