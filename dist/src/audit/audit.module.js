"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditModule = void 0;
const history_1 = require("../history");
const mailer_1 = require("../mailer");
const repository_1 = require("../repository");
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
let AuditModule = class AuditModule {
};
AuditModule = __decorate([
    (0, common_1.Module)({
        imports: [repository_1.RepositoryModule, mailer_1.MailerModule, history_1.HistoryModule],
        providers: [service_1.AuditService],
        controllers: [controller_1.AuditController],
    })
], AuditModule);
exports.AuditModule = AuditModule;
//# sourceMappingURL=audit.module.js.map