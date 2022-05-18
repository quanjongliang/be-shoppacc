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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const core_1 = require("../core");
const repository_1 = require("../repository");
const common_1 = require("@nestjs/common");
let TagService = class TagService {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    async createTag(createTagDto) {
        const { title } = createTagDto;
        const checkTag = await this.tagRepository.findOne({ title });
        if (checkTag)
            throw new common_1.HttpException(core_1.TAG_MESSAGE.CONFLICT, common_1.HttpStatus.CONFLICT);
        return this.tagRepository.save(Object.assign({}, createTagDto));
    }
    async updateTag(id, updateTagDto) {
        const { title } = updateTagDto;
        if (title) {
            const checkTag = await this.tagRepository.findOne({ title });
            if (checkTag)
                throw new common_1.HttpException(core_1.TAG_MESSAGE.CONFLICT, common_1.HttpStatus.CONFLICT);
        }
        return this.tagRepository.update({ id }, Object.assign({}, updateTagDto));
    }
    async getAll(query) {
        const { type } = query;
        const where = type ? { type } : {};
        return this.tagRepository.find({
            where,
        });
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TagRepository])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map