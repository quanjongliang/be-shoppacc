import { Column, Entity } from "typeorm";
import { BaseColumn } from "../base";
export const HISTORY_TABLE_NAME = "history";

export enum HISTORY_TYPE {
  AMOUNT_TRANSFERRED = "AMOUNT_TRANSFERRED",
  CREATE_AUDIT = "CREATE_AUDIT",
  CHANGE_STATUS_AUDIT = "CHANGE_STATUS_AUDIT",
  CHANGE_ROLE = "CHANGE_ROLE",
  BUY_ACCOUNT_BY_USER = "BUY_ACCOUNT_BY_USER",
  REFUND_ACCOUNT = "REFUND_ACCOUNT",
  CONFIRM_BUY_ACCOUNT = "CONFIRM_BUY_ACCOUNT",
  VN_PAY = "VN_PAY",
  TRANSACTION='TRANSACTION'
}

@Entity(HISTORY_TABLE_NAME)
export class History extends BaseColumn {
  @Column({ enum: HISTORY_TYPE })
  type: HISTORY_TYPE;

  @Column({ default: true, type: "text" })
  historyMessage: string;

  @Column({ type: "text", nullable: true })
  information: string;

  @Column({ type: "text", nullable: true })
  accountRefund: string;
}
