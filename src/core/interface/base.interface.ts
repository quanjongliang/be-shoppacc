import { Account, User } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BaseQuery {
  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
  @IsOptional()
  @ApiPropertyOptional()
  offset?: number;
}

export class BaseQueryResponse<T> {
  data: T[];
  total: number;
}
