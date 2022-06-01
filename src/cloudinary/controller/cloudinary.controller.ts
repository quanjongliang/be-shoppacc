import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CloundinaryService } from "../service";
import { v4 as uuid } from "uuid";
import { JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { LIMIT_FILE_BANNER,} from "@/core";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { USER_ROLE } from "@/entity";

@ApiTags("cloundinary")
@ApiBearerAuth()
@Controller("cloundinary")
export class CloundinaryController {
  constructor(private cloudinaryService: CloundinaryService) {}

  @Get()
  async getIsBannerImage() {
    return this.cloudinaryService.getIsBannerFiles();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
  @UseInterceptors(
    FilesInterceptor("files", LIMIT_FILE_BANNER, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async postBannerImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.cloudinaryService.uploadMultiFiles(files);
  }
}
