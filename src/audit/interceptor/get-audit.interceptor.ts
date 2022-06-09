import { BaseQueryResponse, calculateTotalAccount, calculateTotalAudit, returnCalculatedTotal } from "@/core";
import { Audit } from "@/entity";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class GetAuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    return next.handle().pipe(
      map((data: BaseQueryResponse<Audit>) => {
        const formattedData = data.data.map((d) => {
          const {
            id,
            createdAt,
            isDeleted,
            type,
            user,
            auditInformations,
            information,
            total,
            ...result
          } = d;
          const formattedAuditInformation = auditInformations.map((aI) => {
            const { id, isDeleted, createdAt, updatedAt, ...result } = aI;
            return result;
          });
          const calculatorTotal =returnCalculatedTotal(d)
          return {
            ...result,
            id,
            auditInformations: formattedAuditInformation,
            user: user.username,
            information,
            type,
            total:calculatorTotal
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

