"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: process.env["POSTGRES_HOST"] || "localhost",
                port: parseInt(process.env["POSTGRES_PORT"] || "5432", 10),
                username: process.env["POSTGRES_USER"] || "postgres",
                password: process.env["POSTGRES_PASSWORD"] || "postgres",
                database: process.env["POSTGRES_DB"] || "shoppAcc",
                synchronize: !!JSON.parse(process.env["TYPEORM_SYNCHRONIZE"] || "true"),
                entities: [__dirname + "/dist/**/*.entity.js"],
                autoLoadEntities: true,
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map