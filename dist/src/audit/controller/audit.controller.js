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
exports.AuditController = void 0;
const auth_1 = require("../../auth");
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const service_1 = require("../service");
let AuditController = class AuditController {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async createNewAudit(user, createAuditDto) {
        return this.auditService.createNewAudit(user, createAuditDto);
    }
    async createAuditByAdmin(user, createAuditByAdmin) {
        return this.auditService.createAuditByAdmin(user, createAuditByAdmin);
    }
    async getAuditHistory(user, queryAuditDto) {
        return this.auditService.queryAuditByUser(queryAuditDto, user);
    }
    async getAllAuditHistory(queryAuditDto) {
        return this.auditService.queryAuditByUser(queryAuditDto);
    }
    async updateStatusAudit(user, id) {
        return this.auditService.updateStatusAudit(user, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.User,
        dto_1.CreateAuditDto]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "createNewAudit", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    __param(0, (0, auth_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.User,
        dto_1.CreateAuditByAdminDto]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "createAuditByAdmin", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.User,
        dto_1.QueryAuditDto]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "getAuditHistory", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryAuditDto]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "getAllAuditHistory", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UseGuards)(auth_1.RolesGuard),
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    __param(0, (0, auth_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.User, String]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "updateStatusAudit", null);
AuditController = __decorate([
    (0, common_1.Controller)('audit'),
    (0, swagger_1.ApiTags)('audit'),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    __metadata("design:paramtypes", [service_1.AuditService])
], AuditController);
exports.AuditController = AuditController;
//# sourceMappingURL=audit.controller.js.map