"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../entity");
const common_1 = require("@nestjs/common");
const driver_1 = require("./driver");
const user_1 = require("./user");
const post_1 = require("./post");
const tag_1 = require("./tag");
const account_1 = require("./account");
const cloudinary_1 = require("./cloudinary");
const audit_1 = require("./audit");
const audit_information_1 = require("./audit-information");
const history_1 = require("./history");
const ENTITY_LIST = [
    entity_1.User,
    entity_1.Driver,
    entity_1.Post,
    entity_1.Tag,
    entity_1.Account,
    entity_1.Cloundinary,
    entity_1.Audit,
    entity_1.AuditInformation,
    entity_1.History,
];
const REPOSITORY_LIST = [
    user_1.UserRepository,
    driver_1.DriverRepository,
    post_1.PostRepository,
    tag_1.TagRepository,
    account_1.AccountRepository,
    cloudinary_1.CloundinaryReposiotry,
    audit_1.AuditRepository,
    audit_information_1.AuditInformationRepository,
    history_1.HistoryRepository,
];
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...ENTITY_LIST, ...REPOSITORY_LIST])],
        exports: [typeorm_1.TypeOrmModule],
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=repository.module.js.map