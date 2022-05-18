import { BaseColumn } from '../base';
export declare const HISTORY_TABLE_NAME = "history";
export declare enum HISTORY_TYPE {
    AMOUNT_TRANSFERRED = "AMOUNT_TRANSFERRED",
    CREATE_AUDIT = "CREATE_AUDIT",
    CHANGE_STATUS_AUDIT = "CHANGE_STATUS_AUDIT",
    CHANGE_ROLE = "CHANGE_ROLE",
    BUY_ACCOUNT_BY_USER = "BUY_ACCOUNT_BY_USER"
}
export declare class History extends BaseColumn {
    type: HISTORY_TYPE;
    historyMessage: string;
}
