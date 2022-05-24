import { ACCOUNT_MESSAGE } from "@/core";
import { ACCOUNT_RELATION } from "@/entity";
import { AccountRepository } from "@/repository";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AccountActionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountRepository: AccountRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    if (id) {
      const account = await this.accountRepository.findOne({
        where: { id },
        relations: [
          // ACCOUNT_RELATION.BOUGHT_BY,
          ACCOUNT_RELATION.TAG,
          ACCOUNT_RELATION.CLOUNDINARY,
          ACCOUNT_RELATION.USER,
        ],
      });
      if (!account) {
        throw new HttpException(
          ACCOUNT_MESSAGE.NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }
      if (account.soldAt) {
        throw new BadRequestException(ACCOUNT_MESSAGE.CAN_NOT_BEHAVIOR);
      }
      request.account = account;
      return true;
    }
  }
}
