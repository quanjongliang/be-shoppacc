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
exports.AuditInformation = exports.AUDIT_INFORMATION_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const audit_1 = require("../audit");
const base_1 = require("../base");
exports.AUDIT_INFORMATION_TABLE_NAME = 'auditInformation';
let AuditInformation = class AuditInformation extends base_1.BaseColumn {
    calculateTotal() {
        this.total = this.quantity * this.unitPrice;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditInformation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AuditInformation.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AuditInformation.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AuditInformation.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => audit_1.Audit, (audit) => audit.auditInformations),
    __metadata("design:type", audit_1.Audit)
], AuditInformation.prototype, "audit", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuditInformation.prototype, "calculateTotal", null);
AuditInformation = __decorate([
    (0, typeorm_1.Entity)(exports.AUDIT_INFORMATION_TABLE_NAME)
], AuditInformation);
exports.AuditInformation = AuditInformation;
//# sourceMappingURL=audit-information.entity.js.map