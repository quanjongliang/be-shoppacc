import { AUDIT_MESSAGE } from "@/core";
import { AUDIT_TYPE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export enum TYPE_TRANSFER {
  PLUS = "PLUS",
  MINUS = "MINUS",
}
export class CreateAuditDto {
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  UID: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  server: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  username: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  password: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  accountName: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  phone: string;
  @ApiProperty()
  note: string;
  @ApiProperty({ type: () => [AuditInformationDto] })
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  auditInformation: AuditInformationDto[];
}

export class CreateAuditByAdminDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  typeAudit: AUDIT_TYPE;
  @ApiProperty()
  amountTransferred: number;
  @ApiProperty()
  typeTransfer: TYPE_TRANSFER;
}

export class AuditInformationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  unitPrice: number;
}
