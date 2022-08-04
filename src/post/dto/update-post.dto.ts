import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdatePostDto {
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  content?: string;
  @ApiPropertyOptional()
  description?: string;
  @ApiPropertyOptional()
  @IsOptional()
  keyword?: string;
}
