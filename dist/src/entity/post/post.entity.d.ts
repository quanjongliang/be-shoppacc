import { BaseColumn } from '../base';
import { Cloundinary } from '../cloudinary';
import { Tag } from '../tag';
import { User } from '../user';
export declare enum POST_RELATION {
    CLOUNDINARY = "cloundinary",
    USER = "user",
    TAG = "tags",
    POST_TAGS_TAG = "post_tags_tag"
}
export declare const POST_TABLE_NAME = "post";
export declare class Post extends BaseColumn {
    title: string;
    slug: string;
    content: string;
    description: string;
    imageUrl: string;
    cloundinary: Cloundinary;
    user: User;
    tags: Tag[];
}
