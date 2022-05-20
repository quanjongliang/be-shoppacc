import { TAG_TYPE } from "@/entity";
import { TagRepository } from "@/repository";
import { getNotFoundTagMessage } from "@/tag";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class CreateAuditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tagRepository: TagRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tag = await this.tagRepository.findOne({
      title: request?.body?.server,
      type: TAG_TYPE.SERVER,
    });
    if (!tag)
      throw new NotFoundException(
        getNotFoundTagMessage(request?.body?.server, TAG_TYPE.SERVER)
      );
    return true;
  }
}
