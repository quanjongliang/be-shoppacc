import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { LIMIT_FILE_ACCOUNT, MOD_ADMIN_ROLE } from "@/core";
import { Account, User } from "@/entity";
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { CurrentAccount } from "../decorator";
import { BuyAccountDto, CreateAccountDto, UpdateAccountDto } from "../dto";
import { AccountActionGuard } from "../guard";
import { AccountAuditService, AccountService } from "../service";
@Controller("account")
@ApiTags("account")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController {
  constructor(
    private accountService: AccountService,
    private accountAuditService: AccountAuditService
  ) {}

  @Roles(...MOD_ADMIN_ROLE)
  @Post("create")
  @UseInterceptors(
    FilesInterceptor("files", LIMIT_FILE_ACCOUNT, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async createNewAccount(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.accountService.createAccount(createAccountDto, user, files);
  }

  @Patch("buy/:id")
  async buyAccount(
    @CurrentUser() user: User,
    @Param("id") id: string,
    @Body() buyAccountDto: BuyAccountDto
  ) {
    return this.accountAuditService.buyAccountByUser(user, id, buyAccountDto);
  }

  @Delete(":id")
  @UseGuards(AccountActionGuard)
  @Roles(...MOD_ADMIN_ROLE)
  async deleteAccount(@CurrentAccount() account: Account) {
    return this.accountService.removeAccount(account);
  }

  @Patch(":id")
  @UseGuards(AccountActionGuard)
  @Roles(...MOD_ADMIN_ROLE)
  @UseInterceptors(
    FilesInterceptor("files", LIMIT_FILE_ACCOUNT, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async updateAccount(
    @CurrentAccount() account: Account,
    @Body() updateAccountDto: UpdateAccountDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.accountService.updateAccount(account, updateAccountDto, files);
  }
}
