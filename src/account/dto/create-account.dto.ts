import { AUDIT_MESSAGE } from "@/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  ar: number;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  code: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  tinhHuy: number;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  nguyenThach: number;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  char: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  weapon: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  server: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  name: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  oldPrice: number;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  newPrice: number;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  description: string;
}
