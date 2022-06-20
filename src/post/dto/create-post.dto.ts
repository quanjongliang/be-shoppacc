import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  title: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  description: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  content: string;
  tags: string;
}
