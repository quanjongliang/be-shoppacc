import { ACCOUNT_MESSAGE } from "@/core";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsOptional } from "class-validator";
import { CreateAccountDto } from "./create-account.dto";

export class UpdateAccountDto extends CreateAccountDto {}

export class BuyAccountDto {
  @ApiPropertyOptional()
  phone: string;
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  gmail?: string;
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  social?: string;
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  others?: string;
}

export class BuyMultiAccountDto extends BuyAccountDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  ids: string[];
}
export class DeleteMultiAccountDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  ids: string[];
}
