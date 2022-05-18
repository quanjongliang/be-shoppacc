import { QueryPostDto, QueryPostTagDto } from '../dto';
import { PostService } from '../service';
export declare class PostGetController {
    private postService;
    constructor(postService: PostService);
    getAllPost(queryPost: QueryPostDto): Promise<import("../../core").BaseQueryResponse<import("../../entity").Post>>;
    getPostById(id: string): Promise<import("../../entity").Post>;
    getPostBySlug(slug: string): Promise<import("../../entity").Post>;
    getAllPostByTag(queryPostByTag: QueryPostTagDto): Promise<import("../../entity").Post[]>;
}
