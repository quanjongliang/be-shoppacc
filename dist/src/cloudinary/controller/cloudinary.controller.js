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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloundinaryController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const service_1 = require("../service");
const uuid_1 = require("uuid");
const common_5 = require("@nestjs/common");
const auth_1 = require("../../auth");
const core_1 = require("../../core");
const swagger_1 = require("@nestjs/swagger");
let CloundinaryController = class CloundinaryController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async getIsBannerImage() {
        return this.cloudinaryService.getIsBannerFiles();
    }
    async postBannerImage(files) {
        return this.cloudinaryService.uploadMultiFiles(files);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CloundinaryController.prototype, "getIsBannerImage", null);
__decorate([
    (0, common_3.Post)(),
    (0, common_5.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 3, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (_req, file, cb) => {
                const randomName = (0, uuid_1.v4)();
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_2.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CloundinaryController.prototype, "postBannerImage", null);
CloundinaryController = __decorate([
    (0, swagger_1.ApiTags)('cloundinary'),
    (0, common_4.Controller)('cloundinary'),
    __metadata("design:paramtypes", [service_1.CloundinaryService])
], CloundinaryController);
exports.CloundinaryController = CloundinaryController;
//# sourceMappingURL=cloudinary.controller.js.map