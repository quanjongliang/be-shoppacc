import { Tag, TAG_TYPE } from "@/entity";
import { getNotFoundTagMessage } from "@/tag";
import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  //   async checkExistTag(title: string, type: TAG_TYPE): Promise<Tag> {
  //     const tag = await this.findOne({
  //       title,
  //       type,
  //     });
  //     if (!tag) throw new NotFoundException(getNotFoundTagMessage(title, type));
  //     return tag;
  //   }
}
