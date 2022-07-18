import { BaseQuery } from "@/core";
import { ACCOUNT_STATUS } from "@/entity";
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
  @IsOptional()
  @ApiPropertyOptional()
  queryString?: string;
  @ApiPropertyOptional()
  startPrice?: number;
  @ApiPropertyOptional()
  endPrice?: number;
  @ApiPropertyOptional()
  isSold?: boolean;
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
