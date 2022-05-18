/// <reference types="multer" />
import { Cloundinary } from '@/entity';
import { CloundinaryReposiotry } from '@/repository';
export declare class CloundinaryService {
    private cloudinaryRepository;
    constructor(cloudinaryRepository: CloundinaryReposiotry);
    uploadFile(file: Express.Multer.File, isBanner?: boolean, order?: number): Promise<Cloundinary>;
    deleteFile(publicId: string): Promise<[any, import("typeorm").DeleteResult]>;
    getIsBannerFiles(): Promise<Cloundinary[]>;
    uploadMultiFiles(files: Array<Express.Multer.File>): Promise<(Cloundinary | [any, import("typeorm").DeleteResult])[]>;
    uploadMultiFilesAccount(files: Array<Express.Multer.File>): Promise<Cloundinary[]>;
}
