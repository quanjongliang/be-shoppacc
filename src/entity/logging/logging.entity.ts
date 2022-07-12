import { Column, Entity } from "typeorm";
import { BaseColumn } from "../base";

export const LOGGING_TABLE_NAME = "logging";
@Entity(LOGGING_TABLE_NAME)
export class Logging extends BaseColumn {
  @Column({ type: "text", nullable: true })
  information: string;
}
