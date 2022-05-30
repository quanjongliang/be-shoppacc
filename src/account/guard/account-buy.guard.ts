import { HISTORY_MESSAGE } from "@/core";
import { AccountRepository } from "@/repository";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AccountBuyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountRepository: AccountRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { user } = request;
    if (id) {
      const account = await this.accountRepository.checkCanActionAccount(
        id,
        true,
        user.money
      );
      request.account = account;
      return true;
    }
    throw new BadRequestException(HISTORY_MESSAGE.NOT_FOUND);
  }
}
