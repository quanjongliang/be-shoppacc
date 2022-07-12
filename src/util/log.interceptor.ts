import { LoggingRepository } from "@/repository";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingRepository: LoggingRepository) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (process.env.NODE_ENV === "test") {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { method, ip, url, body, query, params } = request;
    const args = { ...body, ...query, ...params };
    const now = Date.now();
    const timestamp = new Date().toISOString();

    Logger.log(`info ${timestamp} ip: ${ip} method: ${method} url: ${url}`);
    Object.keys(args).forEach((k) =>
      Logger.log(`info ${timestamp} ${k}: ${JSON.stringify(args[k])}`)
    );
    const information = `info ${timestamp} ip: ${ip} method: ${method} url: ${url} information : ${JSON.stringify(
      args
    )}`;
    this.loggingRepository
      .save(
        this.loggingRepository.create({
          information,
        })
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return next.handle().pipe(
      tap((value) => {
        this.loggingRepository
          .save(
            this.loggingRepository.create({
              information: JSON.stringify(value),
            })
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        Logger.log(`Response:', ${JSON.stringify(value)}`);
      }),
      finalize(() => {
        Logger.log(`Excution time... ${Date.now() - now}ms`);
      })
    );
  }
}
