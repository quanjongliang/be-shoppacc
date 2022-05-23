import { BaseQueryResponse } from "@/core";
import { Account, TAG_TYPE } from "@/entity";
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
        const formattedData = data.data.map((d) => ({
          ...d,
          cloundinary: d.cloundinary.map((cl, index) =>( cl.url || cl.secure_url) && index > 0),
          user: d.user.username,
          imageUrl: d.imageUrl ? JSON.parse(d.imageUrl)?.url || JSON.parse(d.imageUrl)?.secure_url : d.cloundinary[0].url || d.cloundinary[0].secure_url,
          character: d.character
            ? d.character
            : d.tags
                .filter(({ type }) => type === TAG_TYPE.CHARACTER)
                .map(({ slug }) => slug)
                .join(","),
          weapon: d.weapon
            ? d.weapon
            : d.tags
                .filter(({ type }) => type === TAG_TYPE.WEAPON)
                .map(({ slug }) => slug)
                .join(","),
        }));
        return {
          ...data,
          data: formattedData,
        };
      })
    );
  }
}
