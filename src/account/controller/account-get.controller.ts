import { Query, Controller, Get, UseInterceptors, Request, } from "@nestjs/common";
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
  WishListAccountInterceptor,
} from "../interceptor";
import { PATH_METADATA } from '@nestjs/common/constants';
import { RedisCacheService } from "@/redis/redis.service";
@Controller("account-get")
@ApiTags("account-get")
export class AccountGetController {
  constructor(private accountService: AccountService,private redisCacheSerivce: RedisCacheService) {}

  @Get()
  @UseInterceptors(GetAccountInterceptor)
  async queryAccount(@Query() queryAccountDto: QueryAccountDto , @Request() request:Request) {
    console.log(request.url)
    const data = await this.redisCacheSerivce.get(request.url)
    if(data) return data
    const freshData = await this.accountService.queryAccount(queryAccountDto);
    await this.redisCacheSerivce.set(request.url,freshData)
    return freshData
  }

  @Get("details")
  @UseInterceptors(GetDetailsAccountInterceptor)
  getDeltailAccount(@Query() queryDetails: QueryDetailsAccountDto) {
    return this.accountService.queryDetailsAccount(queryDetails);
  }

  @Get("wish-list")
  @UseInterceptors(WishListAccountInterceptor)
  getWishListAccount(@Query() queryWishList: QueryWishListAccountDto) {
    return this.accountService.queryWishListAccount(queryWishList);
  }
}
