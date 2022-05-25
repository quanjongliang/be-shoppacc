import { BaseQueryResponse } from "@/core";
import { Account, TAG_TYPE } from "@/entity";
import { convertToStringTagSlug } from "@/entity/util";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class GetDetailsAccountInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    return next.handle().pipe(
      map((data: Account) => {
        const isAvatarCloudinary = data.cloundinary.find(cl=>cl.isAvatar) || data.cloundinary[0];
        const character = convertToStringTagSlug(data.tags, TAG_TYPE.CHARACTER);
        const weapon = convertToStringTagSlug(data.tags, TAG_TYPE.WEAPON);
        return {
          ...data,
          cloundinary:  data.cloundinary.map((cl) => cl.url || cl.secure_url),
          user: data.user.username,
          imageUrl: isAvatarCloudinary?.url || isAvatarCloudinary?.secure_url || "",
          character: character,
          weapon: weapon,
        };
      })
    );
  }
}
