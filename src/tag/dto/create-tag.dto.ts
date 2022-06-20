import { AUDIT_MESSAGE } from "@/core";
import { TAG_TYPE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  title: string;
  @ApiPropertyOptional()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  content: ObjectTypeInterface;
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  @ApiPropertyOptional({ enum: TAG_TYPE })
  type: TAG_TYPE;
}

export interface ObjectTypeInterface {
  [key: string]: string;
}
