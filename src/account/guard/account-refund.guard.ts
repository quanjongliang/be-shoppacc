import { ACCOUNT_MESSAGE } from "@/core";
import { ACCOUNT_RELATION } from "@/entity";
import { AccountRepository } from "@/repository";
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AccountRefundGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountRepository: AccountRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    if (id) {
      const account = await this.accountRepository.findOne({where:{id},relations:[ACCOUNT_RELATION.CLOUNDINARY,ACCOUNT_RELATION.TAG,ACCOUNT_RELATION.USER]})
      if(account.boughtBy || account.soldAt){
        request.account = account
        return true;
      }
    }
    throw new BadRequestException(ACCOUNT_MESSAGE.AVAILABLE);
  }
}
