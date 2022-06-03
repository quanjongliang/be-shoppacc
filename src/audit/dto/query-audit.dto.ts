import { BaseQuery } from "@/core";
import { AUDIT_STATUS, AUDIT_TYPE } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryAuditDto extends BaseQuery {
  @ApiProperty()
  @IsOptional()
  status?: AUDIT_STATUS;
  @ApiProperty()
  @IsOptional()
  type?: AUDIT_TYPE;
}
