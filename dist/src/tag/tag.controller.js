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
exports.TagController = void 0;
const auth_1 = require("../auth");
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const tag_service_1 = require("./tag.service");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../core");
const common_2 = require("@nestjs/common");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async createTag(createTagDto) {
        return this.tagService.createTag(createTagDto);
    }
    async updateTag(id, updateTagDto) {
        return this.tagService.updateTag(id, updateTagDto);
    }
    async getAllTag(queryTag) {
        return this.tagService.getAll(queryTag);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "createTag", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "updateTag", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getAllTag", null);
TagController = __decorate([
    (0, common_1.Controller)('tag'),
    (0, swagger_1.ApiTags)('tag'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, auth_1.Roles)(...core_1.MOD_ADMIN_ROLE),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map