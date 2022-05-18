"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const repository_1 = require("../repository");
const service_1 = require("./service");
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("../core");
const mailer_1 = require("../mailer");
const history_1 = require("../history");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            repository_1.RepositoryModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: core_1.JWT_CONFIG.SECRET,
                signOptions: { expiresIn: core_1.JWT_CONFIG.EXPIRES_IN },
            }),
            mailer_1.MailerModule,
            history_1.HistoryModule
        ],
        controllers: [controller_1.AuthController, controller_1.HideAuthController],
        providers: [service_1.AuthService, service_1.LocalStrategy, service_1.JwtStrategy],
        exports: [service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map