import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { User, USER_ROLE } from "@/entity";
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Patch,
  UseInterceptors,
  Param,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateAuditByAdminDto, CreateAuditDto, QueryAuditDto } from "../dto";
import { GetAuditInterceptor } from "../interceptor";
import { AuditService } from "../service";

@Controller("audit")
@ApiTags("audit")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Post()
  async createNewAudit(
    @CurrentUser() user: User,
    @Body() createAuditDto: CreateAuditDto
  ) {
    return this.auditService.createNewAudit(user, createAuditDto);
  }

  @Post("create")
  @Roles(USER_ROLE.ADMIN)
  async createAuditByAdmin(
    @CurrentUser() user: User,
    @Body() createAuditByAdmin: CreateAuditByAdminDto
  ) {
    return this.auditService.createAuditByAdmin(user, createAuditByAdmin);
  }

  @Get()
  @UseInterceptors(GetAuditInterceptor)
  async getAuditHistory(
    @CurrentUser() user: User,
    @Query() queryAuditDto: QueryAuditDto
  ) {
    return this.auditService.queryAuditByUser(queryAuditDto, user);
  }

  @Get("all")
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
  @UseInterceptors(GetAuditInterceptor)
  async getAllAuditHistory(@Query() queryAuditDto: QueryAuditDto) {
    return this.auditService.queryAuditByUser(queryAuditDto);
  }

  @Get(":id")
  @ApiParam({
    name:"id"
  })
  async getAuditHistoryById(@Param('id') id : string){
    return this.auditService.getAuditById(id)
  }

 

  @Patch("update/:id")
  @UseGuards(RolesGuard)
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
  async updateStatusAudit(@CurrentUser() user: User, @Param("id") id: string) {
    return this.auditService.updateStatusAudit(user, id);
  }
}
