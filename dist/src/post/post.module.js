"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const cloudinary_1 = require("../cloudinary");
const repository_1 = require("../repository");
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const interceptor_1 = require("./interceptor");
const service_1 = require("./service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [repository_1.RepositoryModule, cloudinary_1.CloudinaryModule],
        providers: [service_1.PostService, interceptor_1.GetAllPostInterceptor],
        controllers: [controller_1.PostController, controller_1.PostGetController],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map