import { AUDIT_MESSAGE } from "@/core";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateAccountDto {
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  ar: number;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  code: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  tinhHuy: number;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  moonPack: number;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  nguyenThach: number;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  char: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  weapon: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  server: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  oldPrice: number;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  newPrice: number;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  description: string;
  @ApiPropertyOptional()
  @IsOptional()
  game?:string
}
