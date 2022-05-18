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
exports.AuditInformationDto = exports.CreateAuditByAdminDto = exports.CreateAuditDto = exports.TYPE_TRANSFER = void 0;
const entity_1 = require("../../entity");
const swagger_1 = require("@nestjs/swagger");
var TYPE_TRANSFER;
(function (TYPE_TRANSFER) {
    TYPE_TRANSFER["PLUS"] = "PLUS";
    TYPE_TRANSFER["MINUS"] = "MINUS";
})(TYPE_TRANSFER = exports.TYPE_TRANSFER || (exports.TYPE_TRANSFER = {}));
class CreateAuditDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "UID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "accountName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [AuditInformationDto] }),
    __metadata("design:type", Array)
], CreateAuditDto.prototype, "auditInformation", void 0);
exports.CreateAuditDto = CreateAuditDto;
class CreateAuditByAdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditByAdminDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditByAdminDto.prototype, "typeAudit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateAuditByAdminDto.prototype, "amountTransferred", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuditByAdminDto.prototype, "typeTransfer", void 0);
exports.CreateAuditByAdminDto = CreateAuditByAdminDto;
class AuditInformationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuditInformationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AuditInformationDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AuditInformationDto.prototype, "unitPrice", void 0);
exports.AuditInformationDto = AuditInformationDto;
//# sourceMappingURL=create-audit.dto.js.map