import { BaseColumn } from '../base';
export declare const DRIVER_TABLE_NAME = "driver";
export declare class Driver extends BaseColumn {
    driverId: string;
    webContentLink: string;
    filename: string;
    mimeType: string;
    webViewLink: string;
    isBanner: boolean;
    order: number;
}
