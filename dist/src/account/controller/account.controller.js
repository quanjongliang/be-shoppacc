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
exports.AccountController = void 0;
const auth_1 = require("../../auth");
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const dto_1 = require("../dto");
const service_1 = require("../service");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async createNewAccount(createAccountDto, user, files) {
        return this.accountService.createAccount(createAccountDto, user, files);
    }
    async buyAccount(user, id) {
        return this.accountService.buyAccountByUser(user, id);
    }
    async deleteAccount(id) {
        return this.accountService.removeAccount(id);
    }
};
__decorate([
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 3, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (_req, file, cb) => {
                const randomName = (0, uuid_1.v4)();
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAccountDto,
        entity_1.User,
        Array]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createNewAccount", null);
__decorate([
    (0, common_1.Patch)('buy/:id'),
    __param(0, (0, auth_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.User, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "buyAccount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deleteAccount", null);
AccountController = __decorate([
    (0, common_1.Controller)('account'),
    (0, swagger_1.ApiTags)('account'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    __metadata("design:paramtypes", [service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map