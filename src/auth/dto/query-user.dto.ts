import { BaseQuery } from "@/core";
import { USER_ROLE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryUserDto extends BaseQuery {
  @ApiPropertyOptional()
  @IsOptional()
  role?: USER_ROLE;
  @IsOptional()
  @ApiPropertyOptional()
  username?: string;
}
