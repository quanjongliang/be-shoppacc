import { BaseQuery } from "@/core";
import { USER_ROLE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryUserDto extends BaseQuery {
  @ApiProperty()
  @IsOptional()
  role?: USER_ROLE;
  @IsOptional()
  @ApiProperty()
  username?: string;
}
