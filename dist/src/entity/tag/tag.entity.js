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
exports.Tag = exports.TAG_TABLE_NAME = exports.TAG_RELATION = exports.TAG_TYPE = void 0;
const typeorm_1 = require("typeorm");
const account_1 = require("../account");
const base_1 = require("../base");
var TAG_TYPE;
(function (TAG_TYPE) {
    TAG_TYPE["WEAPON"] = "WEAPON";
    TAG_TYPE["SERVER"] = "SERVER";
    TAG_TYPE["CHARACTER"] = "CHARACTER";
})(TAG_TYPE = exports.TAG_TYPE || (exports.TAG_TYPE = {}));
var TAG_RELATION;
(function (TAG_RELATION) {
    TAG_RELATION["POST"] = "posts";
})(TAG_RELATION = exports.TAG_RELATION || (exports.TAG_RELATION = {}));
exports.TAG_TABLE_NAME = 'tag';
let Tag = class Tag extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Tag.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Tag.prototype, "information", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: TAG_TYPE, default: TAG_TYPE.WEAPON }),
    __metadata("design:type", String)
], Tag.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => account_1.Account, (account) => account.tags, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Tag.prototype, "accounts", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)(exports.TAG_TABLE_NAME)
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map