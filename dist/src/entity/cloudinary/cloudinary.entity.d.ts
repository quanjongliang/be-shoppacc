import { Account } from '../account';
export declare const CLOUNDINARY_TABLE_NAME = "cloundinary";
export declare class Cloundinary {
    public_id: string;
    asset_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: Date;
    bytes: number;
    type: string;
    etag: string;
    url: string;
    secure_url: string;
    original_filename: string;
    original_extension: string;
    api_key: string;
    isBanner: boolean;
    order: number;
    account: Account;
}
