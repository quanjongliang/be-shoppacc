import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  PrimaryColumn,
} from "typeorm";

export enum BANK_CODE {
  VNPAYQR = "VNPAYQR",
  NCB = "NCB",
  SCB = "SCB",
  SACOMBANK = "SACOMBANK",
  EXIMBANK = "EXIMBANK",
  MSBANK = "MSBANK",
  NAMABANK = "NAMABANK",
  VISA = "VISA",
  VNMART = "VNMART",
  VIETINBANK = "VIETINBANK",
  VIETCOMBANK = "VIETCOMBANK",
  HDBANK = "HDBANK",
  DONGABANK = "DONGABANK",
  TPBANK = "TPBANK",
  OJB = "OJB",
  BIDV = "BIDV",
  TECHCOMBANK = "TECHCOMBANK",
  VPBANK = "VPBANK",
  AGRIBANK = "AGRIBANK",
  MBBANK = "MBBANK",
  ACB = "ACB",
  OCB = "OCB",
  SHB = "SHB",
  IVB = "IVB",
}

export enum ORDER_TYPE {
  TOPUP = "topup",
  BILLPAYMENT = "billpayment",
  FASHION = "fashion",
}

export enum ORDER_LANGUAGE {
  VN = "vn",
  EN = "en",
}

export const VN_PAY_TABLE_NAME = "vn-pay";

@Entity(VN_PAY_TABLE_NAME)
export class VnPay {
  @PrimaryColumn()
  id: number;
}
