import { BaseQuery } from "@/core";
import { TAG_TYPE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class QueryAccountDto extends BaseQuery {
  @IsOptional()
  @ApiProperty()
  weapon?: string;
}

export class QueryAccountByTagDto {
  @IsOptional()
  @ApiProperty()
  tags: TagDtoQuery[];
}

export class TagDtoQuery {
  title: string;
  type: TAG_TYPE;
}
