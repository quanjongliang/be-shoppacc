import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BaseColumn } from "../base";
import { Cloundinary } from "../cloudinary";
import { Tag, TAG_TYPE } from "../tag";
import { User } from "../user";
import { convertToStringTagSlug } from "../util";

export const ACCOUNT_TABLE_NAME = "account";

export enum ACCOUNT_RELATION {
  CLOUNDINARY = "cloundinary",
  USER = "user",
  TAG = "tags",
}

export enum ACCOUNT_STATUS {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
}

@Entity(ACCOUNT_TABLE_NAME)
export class Account extends BaseColumn {
  @Column()
  @Generated("increment")
  order: number;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ nullable: true, type: "bigint" })
  tinhHuy: number;

  @Column({ nullable: true, type: "bigint" })
  nguyenThach: number;

  @Column({ nullable: true, type: "bigint" })
  moonPack: number;

  @Column({ default: 0, type: "bigint" })
  oldPrice: number;

  @Column({ default: 0, type: "bigint" })
  newPrice: number;

  @Column({nullable:true})
  isSale:boolean

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  slug: string;

  @Column({ type: "text" })
  description: string;

  @Column({ enum: ACCOUNT_STATUS, default: ACCOUNT_STATUS.AVAILABLE })
  status: ACCOUNT_STATUS;

  @Column({ type: "bigint", nullable: true })
  ar: number;

  @Column({ nullable: true })
  soldAt: Date;

  @Column({ nullable: true })
  server: string;

  @Column({ nullable: true })
  boughtBy: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Cloundinary, (cloudinary) => cloudinary.account)
  cloundinary: Cloundinary[];

  @Column({ nullable: true, type: "text" })
  imageUrl: string;

  @ManyToMany(() => Tag, (tag) => tag.accounts)
  tags: Tag[];

  @Column({ type: "text", nullable: true })
  character: string;

  @Column({ type: "text", nullable: true })
  weapon: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateTagString() {
      this.character = convertToStringTagSlug(this.tags,TAG_TYPE.CHARACTER)
      this.weapon = convertToStringTagSlug(this.tags,TAG_TYPE.WEAPON)
      this.isSale = this.oldPrice < this.newPrice
  }
}
