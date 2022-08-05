import { BaseQueryResponse } from "@/core";
import { Post } from "@/entity";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { map } from "rxjs";
import { Observable } from "rxjs";
import { changeToSlug } from "../util";

@Injectable()
export class GetAllPostInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    return next.handle().pipe(
      map((data: BaseQueryResponse<Post>) => {
        const formattedData = data.data.map((post) => ({
          ...post,
          cloundinary: post?.cloundinary?.url || post?.cloundinary?.secure_url,
        }));
        return { ...data, data: formattedData };
      })
    );
  }
}
