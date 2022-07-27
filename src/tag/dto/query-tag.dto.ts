import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryTagDto {
  @ApiPropertyOptional()
  @IsOptional()
  type?: string;
  @ApiPropertyOptional()
  @IsOptional()
  game?: string;
}

