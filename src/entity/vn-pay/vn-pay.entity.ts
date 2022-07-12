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

export enum VN_PAY_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export const VN_PAY_SUCCESS_RESPONSE = "00";

export const VN_PAY_TABLE_NAME = "vn-pay";

@Entity(VN_PAY_TABLE_NAME)
export class VnPay {
  @PrimaryColumn()
  vnp_TxnRef: number;
  @Column({ type: "text", nullable: true })
  vnp_OrderInfo: string;
  @Column({ enum: ORDER_TYPE, nullable: true })
  vnp_OrderType: ORDER_TYPE;
  @Column({ nullable: true })
  vnp_Amount: number;
  @Column({ nullable: true })
  vnp_IpAddr: string;
  @Column({ nullable: true })
  vnp_CreateDate: string;
  @Column({ nullable: true, enum: BANK_CODE })
  vnp_BankCode: BANK_CODE;
  @Column({ nullable: true })
  vnp_BankTranNo: string;
  @Column({ nullable: true })
  vnp_CardType: string;
  @Column({ nullable: true })
  vnp_PayDate: number;
  @Column({ nullable: true })
  vnp_ResponseCode: string;
  @Column({ nullable: true })
  vnp_TransactionNo: number;
  @Column({ nullable: true })
  vnp_TransactionStatus: string;
  @Column({ enum: VN_PAY_STATUS, default: VN_PAY_STATUS.PENDING })
  status: VN_PAY_STATUS;
}
