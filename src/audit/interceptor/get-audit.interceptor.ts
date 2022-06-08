import { BaseQueryResponse, calculateTotalAccount, calculateTotalAudit } from "@/core";
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
          const calculatorTotal = total  || calculateTotalAudit(auditInformations) || calculateTotalAccount(information.accounts)
          return {
            ...result,
            id,
            auditInformations: formattedAuditInformation,
            user: user.username,
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
