import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryManagementDto {
  @ApiPropertyOptional()
  startDate: Date | string | number;
  @ApiPropertyOptional()
  endDate: Date | string | number;
}

export interface QueryManagementResult {
  countRefund: number;
  countSold: number;
  countCreated: number;
}
