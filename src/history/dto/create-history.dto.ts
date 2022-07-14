import { Account, User } from "@/entity";

export interface CreateChangeRoleHistoryDto {
  admin: string;
  username: string;
  oldRole: string;
  newRole: string;
}

export abstract class CreateAmountTransferredHistoryDto {
  admin: string;
  username: string;
  oldMoney: number;
  newMoney: number;
}

export abstract class CreateCreateAuditHistoryDto {
  username: string;
  UID: string;
}

export abstract class CreateConfirmHistoryDto extends CreateCreateAuditHistoryDto {
  admin: string;
}

export abstract class CreateBuyAccountHistoryDto {
  username: string;
  account: Account;
}

export abstract class CreateBuyMultiAccountHistoryDto {
  username: string;
  accounts: Account[];
  cost: number;
}

export interface CreateRefundAccountHistoryDto {
  account: Account;
  user: User;
  boughtBy: string;
}

export interface CreateConfirmAccountBuyedHistoryDto {
  total: number;
  user: User;
  admin: string;
}

export interface CreateVnPayHistoryDto {
  user: User;
  vnp_Amount: number;
  vnp_BankTranNo: string;
}

export interface CreateTransactionHistoryDto{
  user:User,
  amount:string,
  transactionID:string,
  description:string
}