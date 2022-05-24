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
export class GetAccountInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    return next.handle().pipe(
      map((data: BaseQueryResponse<Account>) => {
        const formattedData = data.data.map((d) => {
          const [fistCloudinary, ...lastCloundinary] = d.cloundinary;
          const character = convertToStringTagSlug(d.tags, TAG_TYPE.CHARACTER);
          const weapon = convertToStringTagSlug(d.tags, TAG_TYPE.WEAPON);
          return {
            ...d,
            cloundinary: lastCloundinary.map((cl) => cl.url || cl.secure_url),
            user: d.user.username,
            imageUrl: fistCloudinary?.url || fistCloudinary?.secure_url || "",
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
