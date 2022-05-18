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
exports.User = exports.USER_TABLE_NAME = exports.USER_RELATION = exports.USER_ROLE = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const account_1 = require("../account");
const audit_1 = require("../audit");
const base_1 = require("../base");
const post_1 = require("../post");
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["ADMIN"] = "ADMIN";
    USER_ROLE["MOD"] = "MOD";
    USER_ROLE["USER"] = "USER";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
var USER_RELATION;
(function (USER_RELATION) {
    USER_RELATION["POSTS"] = "posts";
    USER_RELATION["ACCOUNTS"] = "accounts";
    USER_RELATION["AUDITS"] = "audits";
})(USER_RELATION = exports.USER_RELATION || (exports.USER_RELATION = {}));
exports.USER_TABLE_NAME = 'user';
let User = class User extends base_1.BaseColumn {
    setMoneyAndAvatar() {
        this.avatar = this.avatar || 1;
        this.money = this.money || 0;
    }
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: USER_ROLE, default: USER_ROLE.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmedEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isRecievePost", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_1.Post, (post) => post.user, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_1.Account, (account) => account.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => audit_1.Audit, (audit) => audit.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "audits", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "setMoneyAndAvatar", null);
User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map