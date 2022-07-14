import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Account,
  Audit,
  AuditInformation,
  Cloundinary,
  Driver,
  History,
  Logging,
  Post,
  Tag,
  Transaction,
  User,
  VnPay,
} from "@/entity";
import { Module } from "@nestjs/common";
import { DriverRepository } from "./driver";
import { UserRepository } from "./user";
import { PostRepository } from "./post";
import { TagRepository } from "./tag";
import { AccountRepository } from "./account";
import { CloundinaryReposiotry } from "./cloudinary";
import { AuditRepository } from "./audit";
import { AuditInformationRepository } from "./audit-information";
import { HistoryRepository } from "./history";
import { VnPayRepository } from "./vn-pay";
import { LoggingRepository } from "./logging";
import { TransactionRepository } from "./transaction";

const ENTITY_LIST = [
  User,
  Driver,
  Post,
  Tag,
  Account,
  Cloundinary,
  Audit,
  AuditInformation,
  History,
  VnPay,
  Logging,
  Transaction
];
const REPOSITORY_LIST = [
  UserRepository,
  DriverRepository,
  PostRepository,
  TagRepository,
  AccountRepository,
  CloundinaryReposiotry,
  AuditRepository,
  AuditInformationRepository,
  HistoryRepository,
  VnPayRepository,
  LoggingRepository,
  TransactionRepository
];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITY_LIST, ...REPOSITORY_LIST])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
