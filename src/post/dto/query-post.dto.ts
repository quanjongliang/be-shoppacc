import { BaseQuery } from "@/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryPostDto extends BaseQuery {
  @ApiProperty()
  @IsOptional()
  slug?: string;
}

export class QueryPostTagDto extends QueryPostDto {
  @ApiProperty()
  @IsOptional()
  tag?: string;
}
