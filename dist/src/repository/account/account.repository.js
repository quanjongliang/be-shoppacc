"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AccountRepository = class AccountRepository extends typeorm_1.Repository {
    async checkExistAccount(id) {
        const account = await this.findOne({
            where: { id },
            relations: [entity_1.ACCOUNT_RELATION.CLOUNDINARY],
        });
        if (!account)
            throw new common_1.NotFoundException(core_1.ACCOUNT_MESSAGE.NOT_FOUND);
        return account;
    }
};
AccountRepository = __decorate([
    (0, typeorm_1.EntityRepository)(entity_1.Account)
], AccountRepository);
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=account.repository.js.map