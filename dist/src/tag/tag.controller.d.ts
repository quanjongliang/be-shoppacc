import { CreateTagDto, QueryTagDto, UpdateTagDto } from './dto';
import { TagService } from './tag.service';
export declare class TagController {
    private tagService;
    constructor(tagService: TagService);
    createTag(createTagDto: CreateTagDto): Promise<import("../entity").Tag>;
    updateTag(id: string, updateTagDto: UpdateTagDto): Promise<import("typeorm").UpdateResult>;
    getAllTag(queryTag: QueryTagDto): Promise<import("../entity").Tag[]>;
}
