import { BaseQueryResponse } from "@/core";
import { Account, TAG_TYPE } from "@/entity";
import { convertToStringTagSlug } from "@/entity/util";
import { RedisCacheService } from "@/redis/redis.service";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Request } from 'express';
import { FastifyRequest } from 'fastify';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Reflector } from "@nestjs/core";
function isExpressRequest(request: Request | FastifyRequest): request is Request {
  return (request as FastifyRequest).req === undefined;
}
@Injectable()
export class GetAccountInterceptor implements NestInterceptor {
  constructor(private redisCacheService: RedisCacheService,private readonly reflector: Reflector){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request | FastifyRequest = context.switchToHttp().getRequest();
    const url = request.url
    console.log("Before...");
    return next.handle().pipe(
      map((data: BaseQueryResponse<Account>) => {
        const formattedData = data.data.map((d) => {
          d.cloundinary.sort((a, b) => a.order - b.order);
          const isAvatarCloudinary =
            d.cloundinary.find((cl) => cl.isAvatar) || d.cloundinary[0];
          const character =
            d.character || convertToStringTagSlug(d.tags, TAG_TYPE.CHARACTER);
          const weapon =
            d.weapon || convertToStringTagSlug(d.tags, TAG_TYPE.WEAPON);
          return {
            ...d,
            cloundinary: d.cloundinary.map((cl) => cl.url || cl.secure_url),
            user: d.user.username,
            imageUrl:
              isAvatarCloudinary?.url || isAvatarCloudinary?.secure_url || "",
            character: character,
            weapon: weapon,
          };
        });
        return {
          ...data,
          data: formattedData,
        };
      })
    );
  }
}
