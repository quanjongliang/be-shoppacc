import { AUDIT_MESSAGE } from "@/core";
import { TAG_TYPE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  title: string;
  @ApiProperty()
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  content: ObjectType;
  @IsNotEmpty({ message: AUDIT_MESSAGE.NOT_EMPTY })
  @ApiProperty({ enum: TAG_TYPE })
  type: TAG_TYPE;
}

export interface ObjectType {
  [key: string]: string;
}
