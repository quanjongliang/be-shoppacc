import { BaseQuery } from "@/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class QueryAccountDto extends BaseQuery {
  @IsOptional()
  @ApiProperty()
  weapon?: string;
  @IsOptional()
  @ApiProperty()
  character?: string;
  @IsOptional()
  @ApiProperty()
  server?: string;
  @IsOptional()
  @ApiProperty()
  sort?: number;
}

export class QueryDetailsAccountDto {
  @IsOptional()
  @ApiProperty()
  id?: string;
  @IsOptional()
  @ApiProperty()
  slug?: string;
}

export class QueryWishListAccountDto {
  @IsOptional()
  @ApiProperty()
  ids: string;
}
