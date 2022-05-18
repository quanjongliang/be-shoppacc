/// <reference types="multer" />
import { DriverService } from '../service';
export declare class DriverBannerController {
    private driverService;
    constructor(driverService: DriverService);
    uploadFile(files: Array<Express.Multer.File>): Promise<import("../../entity").Driver[]>;
    getBannerUrl(): Promise<import("../../entity").Driver[]>;
}
