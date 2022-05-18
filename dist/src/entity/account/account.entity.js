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
exports.Account = exports.ACCOUNT_STATUS = exports.ACCOUNT_RELATION = exports.ACCOUNT_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const cloudinary_1 = require("../cloudinary");
const tag_1 = require("../tag");
const user_1 = require("../user");
exports.ACCOUNT_TABLE_NAME = 'account';
var ACCOUNT_RELATION;
(function (ACCOUNT_RELATION) {
    ACCOUNT_RELATION["CLOUNDINARY"] = "cloundinary";
    ACCOUNT_RELATION["USER"] = "user";
})(ACCOUNT_RELATION = exports.ACCOUNT_RELATION || (exports.ACCOUNT_RELATION = {}));
var ACCOUNT_STATUS;
(function (ACCOUNT_STATUS) {
    ACCOUNT_STATUS["AVAILABLE"] = "AVAILABLE";
    ACCOUNT_STATUS["SOLD"] = "SOLD";
})(ACCOUNT_STATUS = exports.ACCOUNT_STATUS || (exports.ACCOUNT_STATUS = {}));
let Account = class Account extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('increment'),
    __metadata("design:type", Number)
], Account.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Account.prototype, "oldPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Account.prototype, "newPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: ACCOUNT_STATUS, default: ACCOUNT_STATUS.AVAILABLE }),
    __metadata("design:type", String)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "ar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Account.prototype, "soldAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.accounts),
    __metadata("design:type", user_1.User)
], Account.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cloudinary_1.Cloundinary, (cloudinary) => cloudinary.account),
    __metadata("design:type", Array)
], Account.prototype, "cloundinary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_1.Tag, (tag) => tag.accounts),
    __metadata("design:type", Array)
], Account.prototype, "tags", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)(exports.ACCOUNT_TABLE_NAME)
], Account);
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map