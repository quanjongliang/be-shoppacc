import { BaseQuery } from "@/core";
import { AUDIT_STATUS, AUDIT_TYPE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryAuditDto extends BaseQuery {
  @ApiPropertyOptional()
  @IsOptional()
  status?: AUDIT_STATUS;
  @ApiPropertyOptional()
  @IsOptional()
  type?: AUDIT_TYPE;
  @ApiPropertyOptional()
  queryString?: string = "";
}
