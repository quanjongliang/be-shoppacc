import { JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from "@nestjs/common";
import { CreateTagDto, QueryTagDto, UpdateTagDto } from "./dto";
import { TagService } from "./tag.service";
import { ApiTags, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { USER_ROLE } from "@/entity";

@Controller("tag")
@ApiTags("tag")
@ApiBearerAuth()
export class TagController {
  constructor(private tagService: TagService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
  async createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @ApiParam({ name: "id" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
  @Patch("update/:id")
  async updateTag(@Param("id") id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(id, updateTagDto);
  }

  @Get()
  async getAllTag(@Query() queryTag: QueryTagDto) {
    return this.tagService.getAll(queryTag);
  }
}
