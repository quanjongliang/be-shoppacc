"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloundinaryService = void 0;
const core_1 = require("../../core");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const fs = require("fs");
let CloundinaryService = class CloundinaryService {
    constructor(cloudinaryRepository) {
        this.cloudinaryRepository = cloudinaryRepository;
        cloudinary_1.v2.config({
            cloud_name: core_1.CLOUDINARY_CONFIG.NAME,
            api_key: core_1.CLOUDINARY_CONFIG.API_KEY,
            api_secret: core_1.CLOUDINARY_CONFIG.API_SECRET,
            secure: true,
        });
    }
    async uploadFile(file, isBanner = false, order = 0) {
        try {
            const path = `./${file.path}`;
            const result = await cloudinary_1.v2.uploader.upload(path);
            fs.unlinkSync(`./${path}`);
            return this.cloudinaryRepository.save(Object.assign(Object.assign({}, result), { isBanner, order }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteFile(publicId) {
        return Promise.all([
            cloudinary_1.v2.uploader.destroy(publicId),
            this.cloudinaryRepository.delete({ public_id: publicId }),
        ]);
    }
    async getIsBannerFiles() {
        return this.cloudinaryRepository.find({ isBanner: true });
    }
    async uploadMultiFiles(files) {
        const oldBanners = await this.getIsBannerFiles();
        const promiseRemoveOldBanners = oldBanners.map(({ public_id }) => this.deleteFile(public_id));
        const promiseUploadFile = files.map((file, index) => this.uploadFile(file, true, index + 1));
        return Promise.all([...promiseRemoveOldBanners, ...promiseUploadFile]);
    }
    async uploadMultiFilesAccount(files) {
        const promiseUploadFile = files.map((file, index) => this.uploadFile(file, true, index + 1));
        return Promise.all([...promiseUploadFile]);
    }
};
CloundinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.CloundinaryReposiotry])
], CloundinaryService);
exports.CloundinaryService = CloundinaryService;
//# sourceMappingURL=cloudinary.service.js.map