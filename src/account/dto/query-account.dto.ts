import { BaseQuery } from "@/core";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryAccountDto extends BaseQuery {
  @IsOptional()
  @ApiPropertyOptional()
  weapon?: string;
  @IsOptional()
  @ApiPropertyOptional()
  character?: string;
  @IsOptional()
  @ApiPropertyOptional()
  server?: string;
  @IsOptional()
  @ApiPropertyOptional()
  sort?: number;
}

export class QueryDetailsAccountDto {
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;
  @IsOptional()
  @ApiPropertyOptional()
  slug?: string;
}

export class QueryWishListAccountDto {
  @IsOptional()
  @ApiPropertyOptional()
  ids: string;
}
