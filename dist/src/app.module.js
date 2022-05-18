"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_1 = require("./database");
const mailer_1 = require("./mailer");
const repository_1 = require("./repository");
const auth_1 = require("./auth");
const account_1 = require("./account");
const post_1 = require("./post");
const tag_1 = require("./tag");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_1 = require("./cloudinary");
const audit_1 = require("./audit");
const history_1 = require("./history");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_1.DatabaseModule,
            mailer_1.MailerModule,
            repository_1.RepositoryModule,
            auth_1.AuthModule,
            post_1.PostModule,
            tag_1.TagModule,
            account_1.AccountModule,
            platform_express_1.MulterModule,
            cloudinary_1.CloudinaryModule,
            audit_1.AuditModule,
            history_1.HistoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map