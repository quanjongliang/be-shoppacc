import { TAG_TYPE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTagDto {
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  type?: TAG_TYPE;
  @ApiPropertyOptional()
  description?:string
}
