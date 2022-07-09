import { JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { USER_ROLE } from "@/entity";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { QueryManagementDto } from "./dto";
import { ManagementService } from "./management.service";

@ApiTags("management")
@ApiBearerAuth()
@Controller("management")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Get()
  @Roles(USER_ROLE.ADMIN, USER_ROLE.MOD)
  async getManagementAccount(@Query() queryManagement: QueryManagementDto) {
    return this.managementService.getManagementAccount(queryManagement);
  }
}
