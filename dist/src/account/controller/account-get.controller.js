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
exports.AccountGetController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const service_1 = require("../service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const interceptor_1 = require("../interceptor");
let AccountGetController = class AccountGetController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    queryAccount(queryAccountDto) {
        return this.accountService.queryAccount(queryAccountDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_2.UseInterceptors)(interceptor_1.GetAccountInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryAccountDto]),
    __metadata("design:returntype", void 0)
], AccountGetController.prototype, "queryAccount", null);
AccountGetController = __decorate([
    (0, common_1.Controller)('account-get'),
    (0, swagger_1.ApiTags)('account-get'),
    __metadata("design:paramtypes", [service_1.AccountService])
], AccountGetController);
exports.AccountGetController = AccountGetController;
//# sourceMappingURL=account-get.controller.js.map