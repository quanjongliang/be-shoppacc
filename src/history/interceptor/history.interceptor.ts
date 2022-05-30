import { BaseQueryResponse } from "@/core";
import { History } from "@/entity";
import {
    CallHandler, ExecutionContext, Injectable,
    NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class HistoryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    return next.handle().pipe(
      map((data: BaseQueryResponse<History>) => {
        const formattedData = data.data.map((d) => {
          const information = d.information ? JSON.parse(d.information) : ''
          return {
            ...d,
            information
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
