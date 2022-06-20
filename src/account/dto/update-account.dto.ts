import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
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
  ids: string[];
}
