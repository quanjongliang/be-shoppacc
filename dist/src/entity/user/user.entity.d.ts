import { Account } from '../account';
import { Audit } from '../audit';
import { BaseColumn } from '../base';
import { Post } from '../post';
export declare enum USER_ROLE {
    ADMIN = "ADMIN",
    MOD = "MOD",
    USER = "USER"
}
export interface PayloadTokenUser {
    id: string;
    username: string;
    role: USER_ROLE;
    money: number;
    phone?: string;
    email?: string;
}
export declare enum USER_RELATION {
    POSTS = "posts",
    ACCOUNTS = "accounts",
    AUDITS = "audits"
}
export declare type UserWithOutPassword = Omit<User, 'password'>;
export declare const USER_TABLE_NAME = "user";
export declare class User extends BaseColumn {
    username: string;
    email: string;
    password: string;
    role: USER_ROLE;
    confirmedEmail: boolean;
    isRecievePost: boolean;
    posts: Post[];
    accounts: Account[];
    audits: Audit[];
    avatar: number;
    money: number;
    phone: string;
    setMoneyAndAvatar(): void;
}
