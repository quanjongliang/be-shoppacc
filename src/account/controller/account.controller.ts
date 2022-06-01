import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { LIMIT_FILE_ACCOUNT } from "@/core";
import { Account, User, USER_ROLE } from "@/entity";
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
import { CurrentAccount, CurrentAccounts } from "../decorator";
import {
  BuyAccountDto,
  BuyMultiAccountDto,
  CreateAccountDto,
  UpdateAccountDto,
} from "../dto";
import { AccountActionGuard, AccountBuyGuard } from "../guard";
import { AccountBuyMultiGuard } from "../guard/account-buy-multi.guard";
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

  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
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
  @UseGuards(AccountBuyGuard)
  async buyAccount(
    @CurrentUser() user: User,
    @CurrentAccount() account: Account,
    @Body() buyAccountDto: BuyAccountDto
  ) {
    return this.accountAuditService.buyAccountByUser(
      user,
      account,
      buyAccountDto
    );
  }

  @Patch("buy-multi")
  @UseGuards(AccountBuyMultiGuard)
  async buyMultiAccount(
    @CurrentUser() user: User,
    @CurrentAccounts() accounts: Account[],
    @Body() buyMutiAccountDto: BuyMultiAccountDto
  ) {
    return this.accountAuditService.buyMultiAccountByUser(
      user,
      accounts,
      buyMutiAccountDto
    );
  }

  @Delete(":id")
  @UseGuards(AccountActionGuard)
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
  async deleteAccount(@CurrentAccount() account: Account) {
    return this.accountService.removeAccount(account);
  }

  @Patch(":id")
  @UseGuards(AccountActionGuard)
  @Roles(USER_ROLE.ADMIN,USER_ROLE.MOD)
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
