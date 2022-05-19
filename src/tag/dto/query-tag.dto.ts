import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryTagDto {
  @ApiProperty()
  @IsOptional()
  type: string;
}
