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
exports.HideAuthController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const service_1 = require("../service");
const swagger_1 = require("@nestjs/swagger");
let HideAuthController = class HideAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getAllUser() {
        return this.authService.getAllUser();
    }
    async getAllUserList(queryUserDto) {
        return this.authService.getAllUserList(queryUserDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HideAuthController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)('list-user'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], HideAuthController.prototype, "getAllUserList", null);
HideAuthController = __decorate([
    (0, common_1.Controller)('hide-auth'),
    (0, swagger_1.ApiTags)('hide-auth'),
    __metadata("design:paramtypes", [service_1.AuthService])
], HideAuthController);
exports.HideAuthController = HideAuthController;
//# sourceMappingURL=hide-auth.controller.js.map