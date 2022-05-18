import { Account } from '../account';
import { BaseColumn } from '../base';
export declare enum TAG_TYPE {
    WEAPON = "WEAPON",
    SERVER = "SERVER",
    CHARACTER = "CHARACTER"
}
export declare enum TAG_RELATION {
    POST = "posts"
}
export declare const TAG_TABLE_NAME = "tag";
export declare class Tag extends BaseColumn {
    title: string;
    slug: string;
    information: string;
    type: TAG_TYPE;
    accounts: Account[];
}
