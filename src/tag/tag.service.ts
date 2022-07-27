import { TAG_MESSAGE } from "@/core";
import { Tag, TAG_RELATION, TAG_TYPE } from "@/entity";
import { changeToSlug } from "@/post";
import { TagRepository } from "@/repository";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection, Not, UpdateResult } from "typeorm";
import { CreateTagDto, QueryTagDto, UpdateTagDto } from "./dto";
import { DEFAULT_GENSHIN_IMPACT_TAG_SLUG } from "./util";

@Injectable()
export class TagService {
  constructor(private tagRepository: TagRepository,
    private connection : Connection
    ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { title, content, type,description='' ,game} = createTagDto;
    const checkTag = await this.tagRepository.findOne({ title,isDeleted:false });
    let parent = null
    if (checkTag)
      throw new HttpException(TAG_MESSAGE.CONFLICT, HttpStatus.CONFLICT);
    if(game){
       const tagGame = await this.tagRepository.findOne({where:{
         slug:game,
         type:TAG_TYPE.GAME,
         isDeleted:false
       }}) 
       if(!tagGame) throw new NotFoundException(TAG_MESSAGE.NOT_FOUND_GAME)
       parent = tagGame
    }
    const slug = changeToSlug(title);
    return this.tagRepository.save(
      this.tagRepository.create({
        title,
        type,
        slug,
        information: content ? JSON.stringify(content) : '',
        description,
        parent
      })
    );
  }

  async updateTag(
    id: string,
    updateTagDto: UpdateTagDto,
    isDeleted=false
  ): Promise<UpdateResult> {
    if(isDeleted) return this.tagRepository.update({id},{isDeleted:true})
    const { title } = updateTagDto;
    if (title) {
      const checkTag = await this.tagRepository.findOne({ title,id: Not(id),isDeleted:false });
      if (checkTag)
        throw new HttpException(TAG_MESSAGE.CONFLICT, HttpStatus.CONFLICT);
    }
    const slug = changeToSlug(title);
    return this.tagRepository.update({ id }, { ...updateTagDto, slug });
  }

  async getAll(query: QueryTagDto): Promise<Tag[]> {
    const { type ,game=DEFAULT_GENSHIN_IMPACT_TAG_SLUG} = query;
    if(type === TAG_TYPE.GAME) return this.tagRepository.find({where:{type,isDeleted:false},order:{type:'DESC'}})
    const queryTag = this.tagRepository.createQueryBuilder('tag').orderBy("tag.type",'DESC').where("tag.isDeleted = false").leftJoinAndSelect("tag.parent","parent").andWhere("parent.slug =:slug",{slug:game})
    if(type){
      queryTag.andWhere("tag.type =:type",{type})
    }
    return queryTag.getMany()
  }

  async getTagById(id:string):Promise<Tag>{
    return this.tagRepository.findOne({id})
  }
}