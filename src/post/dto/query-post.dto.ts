import { BaseQuery } from "@/core";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryPostDto extends BaseQuery {
  @ApiPropertyOptional()
  @IsOptional()
  slug?: string;
}

export class QueryPostTagDto extends QueryPostDto {
  @ApiPropertyOptional()
  @IsOptional()
  tag?: string;
}
