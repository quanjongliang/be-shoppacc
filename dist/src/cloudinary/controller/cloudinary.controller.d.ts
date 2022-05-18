/// <reference types="multer" />
import { CloundinaryService } from '../service';
export declare class CloundinaryController {
    private cloudinaryService;
    constructor(cloudinaryService: CloundinaryService);
    getIsBannerImage(): Promise<import("../../entity").Cloundinary[]>;
    postBannerImage(files: Array<Express.Multer.File>): Promise<(import("../../entity").Cloundinary | [any, import("typeorm").DeleteResult])[]>;
}
