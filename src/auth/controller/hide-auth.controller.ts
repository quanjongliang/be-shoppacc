import { RedisCacheService } from "@/redis/redis.service";
import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QueryUserDto } from "../dto";
import { AuthService } from "../service";

@Controller("hide-auth")
@ApiTags("hide-auth")
export class HideAuthController {
  constructor(
    private authService: AuthService,
    // private redisService: RedisCacheService
  ) {}

  // @Post()
  // async createAdminUser(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.createAdminUser(createUserDto);
  // }

  @Get()
  async getAllUser() {
    return this.authService.getAllUser();
  }

  @Get("list-user")
  async getAllUserList(
    @Query() queryUserDto: QueryUserDto,
    @Request() req: Request
  ) {
    // const data = await this.redisService.get(req.url);
    // if (data) return data;
    const listUser = await this.authService.getAllUserList(queryUserDto);
    // await this.redisService.set(req.url, listUser);
    return listUser;
  }
}
