import { Tag } from '@/entity';
import { TagRepository } from '@/repository';
import { UpdateResult } from 'typeorm';
import { CreateTagDto, QueryTagDto, UpdateTagDto } from './dto';
export declare class TagService {
    private tagRepository;
    constructor(tagRepository: TagRepository);
    createTag(createTagDto: CreateTagDto): Promise<Tag>;
    updateTag(id: string, updateTagDto: UpdateTagDto): Promise<UpdateResult>;
    getAll(query: QueryTagDto): Promise<Tag[]>;
}
