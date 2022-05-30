import { AUDIT_MESSAGE, HISTORY_MESSAGE } from "@/core";
import { AccountRepository } from "@/repository";
import { BadRequestException } from "@nestjs/common";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AccountBuyMultiGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountRepository: AccountRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { ids } = request.body;
    const { user } = request;
    if (ids && ids.length > 0) {
      const accounts = await this.accountRepository.checkCanActionAccounts(
        ids,
        true,
        user.money
      );
      request.accounts = accounts;
      return true;
    }
    throw new BadRequestException(HISTORY_MESSAGE.NOT_FOUND);
  }
}
