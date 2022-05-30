import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentAccounts = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.accounts;
  }
);
