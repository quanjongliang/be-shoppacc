import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user";

export const TRANSACTION_TABLE_NAME = "transaction";

export enum TRANSACTION_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCESS",
  EXPIRED = "EXPIRED",
  ERROR = "ERROR",
}

export enum TYPE_TRANSACTION {
  IN = "IN",
  OUT = "OUT",
}

export enum TRANSACTION_RELATIONS {
  USER = "user",
}

@Entity(TRANSACTION_TABLE_NAME)
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ enum: TRANSACTION_STATUS, default: TRANSACTION_STATUS.PENDING })
  status: TRANSACTION_STATUS;
  @Column({ nullable: true })
  transactionID: string;
  @Column({ nullable: true })
  amount: string;
  @Column({ nullable: true, type: "text" })
  description: string;
  @Column({ nullable: true, type: "text" })
  tempestDescription: string;
  @Column({ nullable: true })
  transactionDate: string;
  @Column({ default: false })
  isDeleted: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.transactions, { nullable: true })
  user: User;
}
