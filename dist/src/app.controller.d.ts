/// <reference types="multer" />
import { MailerService } from '@/mailer';
import { AppService } from './app.service';
import { CloundinaryService } from '@/cloudinary';
export declare class AppController {
    private readonly appService;
    private mailerService;
    private cloundinaryService;
    constructor(appService: AppService, mailerService: MailerService, cloundinaryService: CloundinaryService);
    getHello(): string;
    uploadFile(file: Express.Multer.File): Promise<import("./entity").Cloundinary>;
    deleteFile(publicId: string): Promise<[any, import("typeorm").DeleteResult]>;
    sendMail(): Promise<any>;
    getDataExcel(): Promise<import("./entity").User[]>;
    updateSlugPost(): Promise<void>;
}
