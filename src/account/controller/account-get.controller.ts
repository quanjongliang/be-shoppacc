import { Query, Controller, Get, UseInterceptors } from "@nestjs/common";
import {
  QueryAccountDto,
  QueryDetailsAccountDto,
  QueryWishListAccountDto,
} from "../dto";
import { AccountService } from "../service";
import { ApiTags } from "@nestjs/swagger";
import {
  GetAccountInterceptor,
  GetDetailsAccountInterceptor,
} from "../interceptor";

@Controller("account-get")
@ApiTags("account-get")
export class AccountGetController {
  constructor(private accountService: AccountService) {}

  @Get()
  // @UseInterceptors(GetAccountInterceptor)
  queryAccount(@Query() queryAccountDto: QueryAccountDto) {
    return this.accountService.queryAccount(queryAccountDto);
  }

  @Get("details")
  @UseInterceptors(GetDetailsAccountInterceptor)
  getDeltailAccount(@Query() queryDetails: QueryDetailsAccountDto) {
    return this.accountService.queryDetailsAccount(queryDetails);
  }

  @Get("wish-list")
  getWishListAccount(@Query() queryWishList: QueryWishListAccountDto) {
    return this.accountService.queryWishListAccount(queryWishList);
  }
}
