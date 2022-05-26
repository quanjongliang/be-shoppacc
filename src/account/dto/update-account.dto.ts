import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CreateAccountDto } from "./create-account.dto";

export class UpdateAccountDto extends CreateAccountDto {}

export class BuyAccountDto {
  @ApiProperty()
  phone: string;
  @ApiProperty({ nullable: true })
  @IsOptional()
  gmail?: string;
  @ApiProperty({ nullable: true })
  @IsOptional()
  social?: string;
  @ApiProperty({ nullable: true })
  @IsOptional()
  others?: string;
}
