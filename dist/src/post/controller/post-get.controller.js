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
exports.PostGetController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const service_1 = require("../service");
const common_2 = require("@nestjs/common");
const interceptor_1 = require("../interceptor");
let PostGetController = class PostGetController {
    constructor(postService) {
        this.postService = postService;
    }
    async getAllPost(queryPost) {
        return this.postService.getAll(queryPost);
    }
    async getPostById(id) {
        return this.postService.getPostById(id);
    }
    async getPostBySlug(slug) {
        return this.postService.getPostBySlug(slug);
    }
    async getAllPostByTag(queryPostByTag) {
        return this.postService.getAllByTag(queryPostByTag);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_2.UseInterceptors)(interceptor_1.GetAllPostInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryPostDto]),
    __metadata("design:returntype", Promise)
], PostGetController.prototype, "getAllPost", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
    }),
    (0, common_1.Get)('details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostGetController.prototype, "getPostById", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'slug',
    }),
    (0, common_1.Get)('details/news/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostGetController.prototype, "getPostBySlug", null);
__decorate([
    (0, common_1.Get)('tags'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryPostTagDto]),
    __metadata("design:returntype", Promise)
], PostGetController.prototype, "getAllPostByTag", null);
PostGetController = __decorate([
    (0, common_1.Controller)('post-get'),
    (0, swagger_1.ApiTags)('post-get'),
    __metadata("design:paramtypes", [service_1.PostService])
], PostGetController);
exports.PostGetController = PostGetController;
//# sourceMappingURL=post-get.controller.js.map