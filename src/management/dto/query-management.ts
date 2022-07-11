import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryManagementDto {
  @ApiPropertyOptional()
  startDate: Date;
  @ApiPropertyOptional()
  endDate: Date;
}

export interface QueryManagementResult {
  countRefund: number;
  countSold: number;
  countCreated: number;
}

export enum TYPE_COUNT {
  REFUND = "REFUND",
  SOLD = "SOLD",
  CREATED = "CREATED",
}
