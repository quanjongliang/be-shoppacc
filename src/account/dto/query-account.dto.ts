import { BaseQuery } from "@/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class QueryAccountDto extends BaseQuery {
  @IsOptional()
  @ApiProperty()
  weapon?: string;
}
