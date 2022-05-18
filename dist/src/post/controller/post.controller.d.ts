/// <reference types="multer" />
import { User } from '@/entity';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { PostService } from '../service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    createNewPost(createPostDto: CreatePostDto, currentUser: User, file: Express.Multer.File): Promise<import("@/entity").Post>;
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
    } & import("@/entity").Post, [any, import("typeorm").DeleteResult]]>;
    deletePost(id: string): Promise<[import("typeorm").DeleteResult, [any, import("typeorm").DeleteResult]]>;
}
