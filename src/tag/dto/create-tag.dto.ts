import { AUDIT_MESSAGE } from "@/core";
import { TAG_TYPE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTagDto {
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  title: string;
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  @ApiPropertyOptional({ enum: TAG_TYPE })
  type: TAG_TYPE;
  @IsOptional()
  @ApiPropertyOptional()
  game?:string
  @ApiPropertyOptional()
  @IsOptional()
  content?: ObjectTypeInterface;
  @ApiPropertyOptional()
  @IsOptional()
  description?:string
}

export interface ObjectTypeInterface {
  [key: string]: string;
}
