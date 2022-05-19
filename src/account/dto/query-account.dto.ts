import { BaseQuery } from "@/core";
import { TAG_TYPE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class QueryAccountDto extends BaseQuery {
  @IsOptional()
  @ApiProperty()
  weapon?: string;
  @IsOptional()
  @ApiProperty()
  tags?: string;
  @IsOptional()
  @ApiProperty()
  server?: string;
}

export class QueryAccountByTagDto extends BaseQuery {
  @IsOptional()
  @ApiProperty()
  char: string;
  @IsOptional()
  @ApiProperty()
  weapon: string;
  @IsOptional()
  @ApiProperty()
  server: string;
}
