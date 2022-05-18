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
exports.PostService = void 0;
const cloudinary_1 = require("../../cloudinary");
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const util_1 = require("../util");
let PostService = class PostService {
    constructor(postRepository, cloundinaryService, tagRepository) {
        this.postRepository = postRepository;
        this.cloundinaryService = cloundinaryService;
        this.tagRepository = tagRepository;
    }
    async createNewPost(createPostDto, user, file) {
        const { title, content, tags, description } = createPostDto;
        const cloundinary = file
            ? await this.cloundinaryService.uploadFile(file)
            : null;
        const newPost = this.postRepository.create({
            title,
            content,
            user,
            description,
            cloundinary,
            imageUrl: cloundinary.url || cloundinary.secure_url,
        });
        return this.postRepository.save(Object.assign(Object.assign({}, newPost), { slug: (0, util_1.changeToSlug)(title, new Date()) }));
    }
    async deletePost(id) {
        try {
            const post = await this.postRepository.findOne({
                where: {
                    id,
                },
                relations: [entity_1.POST_RELATION.CLOUNDINARY],
            });
            if (!post)
                throw new common_1.HttpException(core_1.POST_MESSAGE.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
            return Promise.all([
                this.postRepository.delete(id),
                this.cloundinaryService.deleteFile(post.cloundinary.public_id),
            ]);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updatePost(id, updatePostDto, file) {
        try {
            const post = await this.postRepository.findOne({
                where: { id },
                relations: [entity_1.POST_RELATION.CLOUNDINARY],
            });
            if (!post)
                throw new common_1.HttpException(core_1.POST_MESSAGE.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
            if (file) {
                const image = await this.cloundinaryService.uploadFile(file);
                const { public_id } = post.cloundinary;
                return Promise.all([
                    this.postRepository.save(Object.assign(Object.assign(Object.assign(Object.assign({}, post), { image }), updatePostDto), { imageUrl: image.url || image.secure_url })),
                    this.cloundinaryService.deleteFile(public_id),
                ]);
            }
            const slug = updatePostDto.title
                ? (0, util_1.changeToSlug)(updatePostDto.title, post.createdAt)
                : post.slug;
            return this.postRepository.update({ id }, Object.assign(Object.assign({}, updatePostDto), { slug }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAll(queryPost) {
        const { offset = 0, limit = core_1.POST_CONFIG.LIMIT, slug } = queryPost;
        const where = {};
        if (slug) {
            where['slug'] = slug;
        }
        const [total, data] = await Promise.all([
            this.postRepository.count(),
            this.postRepository.find({
                skip: offset,
                take: limit,
                relations: [entity_1.POST_RELATION.CLOUNDINARY],
                order: {
                    createdAt: 'DESC',
                },
            }),
        ]);
        return { data, total };
    }
    async getAllByTag(queryPostTag) {
        try {
            const { offset = 0, limit = core_1.POST_CONFIG.LIMIT, tag } = queryPostTag;
            const tags = await this.tagRepository.find({
                where: {
                    title: (0, typeorm_1.In)(tag.split(',')),
                },
            });
            return this.postRepository
                .createQueryBuilder('p')
                .leftJoinAndSelect('p.tags', 'tag')
                .where('tag.id In(:...tagIds)', { tagIds: tags.map(({ id }) => id) })
                .offset(offset)
                .limit(limit)
                .getMany();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getPostById(id) {
        return this.postRepository.findOne({
            where: { id },
            select: ['content', 'description', 'imageUrl', 'id', 'title'],
        });
    }
    async getPostBySlug(slug) {
        return this.postRepository.findOne({
            where: { slug },
            select: ['content', 'description', 'imageUrl', 'id', 'title'],
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.PostRepository,
        cloudinary_1.CloundinaryService,
        repository_1.TagRepository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map