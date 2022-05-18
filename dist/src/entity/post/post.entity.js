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
exports.Post = exports.POST_TABLE_NAME = exports.POST_RELATION = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const cloudinary_1 = require("../cloudinary");
const tag_1 = require("../tag");
const user_1 = require("../user");
var POST_RELATION;
(function (POST_RELATION) {
    POST_RELATION["CLOUNDINARY"] = "cloundinary";
    POST_RELATION["USER"] = "user";
    POST_RELATION["TAG"] = "tags";
    POST_RELATION["POST_TAGS_TAG"] = "post_tags_tag";
})(POST_RELATION = exports.POST_RELATION || (exports.POST_RELATION = {}));
exports.POST_TABLE_NAME = 'post';
let Post = class Post extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cloudinary_1.Cloundinary, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", cloudinary_1.Cloundinary)
], Post.prototype, "cloundinary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.posts, { nullable: true }),
    __metadata("design:type", user_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_1.Tag),
    (0, typeorm_1.JoinTable)({ name: POST_RELATION.POST_TAGS_TAG }),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)('post')
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map