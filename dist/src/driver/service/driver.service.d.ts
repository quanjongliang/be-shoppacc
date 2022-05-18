/// <reference types="multer" />
import { Driver } from '@/entity';
import { DriverRepository } from '@/repository';
import { OAuth2Client } from 'google-auth-library';
import { drive_v3 } from 'googleapis';
export declare class DriverService {
    private driverRepository;
    private oauth2Client;
    private drive;
    constructor(driverRepository: DriverRepository);
    uploadFile(file: Express.Multer.File, isBanner?: boolean, order?: number): Promise<Driver>;
    uploadMultiFiles(files: Array<Express.Multer.File>): Promise<Driver[]>;
    getBannerDriver(): Promise<Driver[]>;
    deleteFile(fileId: string): Promise<import("gaxios").GaxiosResponse<void>>;
    generatePublicUrl(fileId: string): Promise<import("gaxios").GaxiosResponse<drive_v3.Schema$File>>;
    getAccessToken(oAuth2Client: OAuth2Client): Promise<void>;
}
