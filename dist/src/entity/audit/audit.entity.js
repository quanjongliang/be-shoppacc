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
exports.Audit = exports.AUDIT_RELATION = exports.AUDIT_TYPE = exports.AUDIT_STATUS = exports.AUDIT_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const audit_information_1 = require("../audit-information");
const base_1 = require("../base");
const user_1 = require("../user");
exports.AUDIT_TABLE_NAME = 'audit';
var AUDIT_STATUS;
(function (AUDIT_STATUS) {
    AUDIT_STATUS["PENDING"] = "PENDING";
    AUDIT_STATUS["COMPLETED"] = "COMPLETED";
})(AUDIT_STATUS = exports.AUDIT_STATUS || (exports.AUDIT_STATUS = {}));
var AUDIT_TYPE;
(function (AUDIT_TYPE) {
    AUDIT_TYPE["COIN"] = "COIN";
    AUDIT_TYPE["STONE"] = "STONE";
})(AUDIT_TYPE = exports.AUDIT_TYPE || (exports.AUDIT_TYPE = {}));
exports.AUDIT_RELATION = {
    USER: 'user',
    AUDIT_INFORMATIONS: 'auditInformations',
};
let Audit = class Audit extends base_1.BaseColumn {
    calculateTotal() {
        this.total = [...this.auditInformations].reduce((totalAudit, { quantity, unitPrice }) => quantity * unitPrice + totalAudit, 0);
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.audits, { nullable: true }),
    __metadata("design:type", user_1.User)
], Audit.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "UID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "server", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Audit.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: AUDIT_STATUS, default: AUDIT_STATUS.PENDING }),
    __metadata("design:type", String)
], Audit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: AUDIT_TYPE, default: AUDIT_TYPE.STONE }),
    __metadata("design:type", String)
], Audit.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => audit_information_1.AuditInformation, (aInf) => aInf.audit, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Audit.prototype, "auditInformations", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Audit.prototype, "calculateTotal", null);
Audit = __decorate([
    (0, typeorm_1.Entity)(exports.AUDIT_TABLE_NAME)
], Audit);
exports.Audit = Audit;
//# sourceMappingURL=audit.entity.js.map