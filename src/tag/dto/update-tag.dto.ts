import { TAG_TYPE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTagDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  slug?: string;
  @ApiProperty()
  type?: TAG_TYPE;
}
