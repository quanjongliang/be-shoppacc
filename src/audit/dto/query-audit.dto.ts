import { BaseQuery } from "@/core";
import { AUDIT_STATUS } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryAuditDto extends BaseQuery {
  @ApiProperty()
  @IsOptional()
  status?: AUDIT_STATUS;
}
