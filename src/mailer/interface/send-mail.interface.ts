import { Account, AuditInformation } from "@/entity";

export interface SendWelcomeMailInterface {
  to: string;
  username: string;
}

export interface SendTokenMailInterface extends SendWelcomeMailInterface {
  token: string;
}

export interface SendAuditStoneMailInterface extends SendWelcomeMailInterface {
  gameUsername: string;
  password: string;
  server: string;
  UID: string;
  auditInformations: AuditInformation[];
  total: number;
  note?: string;
}

export interface SendBuyAccountMailInterface extends SendWelcomeMailInterface {
  username: string;
  account: Account;
  listImage: string[];
}

export interface SendBuyAccountsMailInterface extends SendWelcomeMailInterface {
  cost: number;
  accounts: Account[];
}
