import { BaseColumn } from '../base';
import { Cloundinary } from '../cloudinary';
import { Tag } from '../tag';
import { User } from '../user';
export declare const ACCOUNT_TABLE_NAME = "account";
export declare enum ACCOUNT_RELATION {
    CLOUNDINARY = "cloundinary",
    USER = "user"
}
export declare enum ACCOUNT_STATUS {
    AVAILABLE = "AVAILABLE",
    SOLD = "SOLD"
}
export declare class Account extends BaseColumn {
    order: number;
    oldPrice: number;
    newPrice: number;
    name: string;
    description: string;
    status: ACCOUNT_STATUS;
    ar: number;
    soldAt: Date;
    user: User;
    cloundinary: Cloundinary[];
    imageUrl: string;
    tags: Tag[];
}
