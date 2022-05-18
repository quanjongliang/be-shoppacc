/// <reference types="multer" />
import { CloundinaryService } from '@/cloudinary';
import { BaseQueryResponse } from '@/core';
import { Post, User } from '@/entity';
import { PostRepository, TagRepository } from '@/repository';
import { CreatePostDto, QueryPostDto, QueryPostTagDto, UpdatePostDto } from '../dto';
export declare class PostService {
    private postRepository;
    private cloundinaryService;
    private tagRepository;
    constructor(postRepository: PostRepository, cloundinaryService: CloundinaryService, tagRepository: TagRepository);
    createNewPost(createPostDto: CreatePostDto, user: User, file?: Express.Multer.File): Promise<Post>;
    deletePost(id: string): Promise<[import("typeorm").DeleteResult, [any, import("typeorm").DeleteResult]]>;
    updatePost(id: string, updatePostDto: UpdatePostDto, file: Express.Multer.File): Promise<import("typeorm").UpdateResult | [{
        imageUrl: string;
        title: string;
        content: string;
        description: string;
        image: import("@/entity").Cloundinary;
        slug: string;
        cloundinary: import("@/entity").Cloundinary;
        user: User;
        tags: import("@/entity").Tag[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    } & Post, [any, import("typeorm").DeleteResult]]>;
    getAll(queryPost: QueryPostDto): Promise<BaseQueryResponse<Post>>;
    getAllByTag(queryPostTag: QueryPostTagDto): Promise<Post[]>;
    getPostById(id: string): Promise<Post>;
    getPostBySlug(slug: string): Promise<Post>;
}
