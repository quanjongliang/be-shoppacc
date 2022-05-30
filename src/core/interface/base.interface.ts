import { Account, User } from "@/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BaseQuery {
  @ApiProperty()
  @IsOptional()
  limit?: number;
  @IsOptional()
  @ApiProperty()
  offset?: number;
}

export class BaseQueryResponse<T> {
  data: T[];
  total: number;
}
