"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryModule = exports.providers = void 0;
const repository_1 = require("../repository");
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
exports.providers = [service_1.CloundinaryService];
let CloudinaryModule = class CloudinaryModule {
};
CloudinaryModule = __decorate([
    (0, common_1.Module)({
        imports: [repository_1.RepositoryModule],
        controllers: [controller_1.CloundinaryController],
        providers: [...exports.providers],
        exports: [...exports.providers],
    })
], CloudinaryModule);
exports.CloudinaryModule = CloudinaryModule;
//# sourceMappingURL=cloudinary.module.js.map