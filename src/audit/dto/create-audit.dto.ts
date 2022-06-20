import { AUDIT_MESSAGE } from "@/core";
import { AUDIT_TYPE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export enum TYPE_TRANSFER {
  PLUS = "PLUS",
  MINUS = "MINUS",
}
export class CreateAuditDto {
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  UID: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  server: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  username: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  password: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  accountName: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  phone: string;
  @ApiPropertyOptional()
  note: string;
  @ApiPropertyOptional({ type: () => [AuditInformationDto] })
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  auditInformation: AuditInformationDto[];
}

export class CreateAuditByAdminDto {
  @ApiPropertyOptional()
  username: string;
  @ApiPropertyOptional()
  typeAudit: AUDIT_TYPE;
  @ApiPropertyOptional()
  amountTransferred: number;
  @ApiPropertyOptional()
  typeTransfer: TYPE_TRANSFER;
}

export class AuditInformationDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  quantity: number;
  @ApiPropertyOptional()
  unitPrice: number;
}
