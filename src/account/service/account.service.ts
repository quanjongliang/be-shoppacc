import { CloundinaryService } from "@/cloudinary";
import {
  ACCOUNT_MESSAGE,
  AUDIT_MESSAGE,
  BaseQueryResponse,
  POST_CONFIG,
  QUILL_LIANG_EMAIL,
  TIM_DANG_EMAIL,
} from "@/core";
import {
  Account,
  ACCOUNT_RELATION,
  ACCOUNT_STATUS,
  TAG_TYPE,
  User,
} from "@/entity";
import { HistoryService } from "@/history";
import { MailerService } from "@/mailer";
import {
  AccountRepository,
  DriverRepository,
  TagRepository,
  UserRepository,
} from "@/repository";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Connection, In } from "typeorm";
import {
  CreateAccountDto,
  QueryAccountByTagDto,
  QueryAccountDto,
  UpdateAccountDto,
} from "../dto";

@Injectable()
export class AccountService {
  constructor(
    private accountRepository: AccountRepository,
    private cloundinaryService: CloundinaryService,
    private connection: Connection,
    private historyService: HistoryService,
    private userRepository: UserRepository,
    private mailerService: MailerService,
    private tagRepository: TagRepository
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
    user: User,
    files: Array<Express.Multer.File>
  ): Promise<Account> {
    return this.connection.transaction(async () => {
      const { ar, char, weapon, server } = createAccountDto;
      const cloundinary = files
        ? await this.cloundinaryService.uploadMultiFilesAccount(files)
        : null;
      const [charTag, weaponTag, serverTag] = await Promise.all([
        this.tagRepository.find({
          where: {
            title: In(char),
            type: TAG_TYPE.CHARACTER,
          },
        }),
        this.tagRepository.find({
          where: {
            title: In(weapon),
            type: TAG_TYPE.WEAPON,
          },
        }),
        this.tagRepository.find({
          where: {
            title: In(server),
            type: TAG_TYPE.WEAPON,
          },
        }),
      ]);
      const imageUrl = cloundinary
        ? JSON.stringify(cloundinary.map((d) => d.url || d.secure_url))
        : "";
      const newAccount = this.accountRepository.create({
        ar,
        ...createAccountDto,
        user,
        cloundinary,
        imageUrl,
        tags: [...charTag, ...weaponTag, ...serverTag],
      });
      return this.accountRepository.save(newAccount);
    });
  }

  // async updateAccount(
  //   updateAccountDto: UpdateAccountDto,
  //   id: string,
  //   file?: Express.Multer.File,
  // ): Promise<Account> {
  //   const account = await this.accountRepository.findOne({
  //     relations: [ACCOUNT_RELATION.CLOUNDINARY],
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!account)
  //     throw new HttpException(ACCOUNT_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
  //   for (const property in updateAccountDto) {
  //     const value = updateAccountDto[property];
  //     if (value) {
  //       if (typeof value === 'number') {
  //         account[property] = value;
  //       } else {
  //         account[property] = JSON.stringify(value);
  //         account[`${property}Count`] = value.Length;
  //       }
  //     }
  //   }
  //   if (file) {
  //     const oldCloundinary = account.cloundinary.public_id;
  //     const cloundinary = await this.cloundinaryService.uploadFile(file);
  //     account.cloundinary = cloundinary;
  //     account.imageUrl = cloundinary.url || cloundinary.secure_url;
  //     await Promise.all([
  //       this.accountRepository.save(account),
  //       this.cloundinaryService.deleteFile(oldCloundinary),
  //     ]);
  //     return this.accountRepository.findOne({ id });
  //   }
  //   return this.accountRepository.save(account);
  // }

  async queryAccount(
    queryAccountDto: QueryAccountDto
  ): Promise<BaseQueryResponse<Account>> {
    const {
      offset = 0,
      limit = POST_CONFIG.LIMIT,
      weapon = "",
      server = "",
      tags = "",
    } = queryAccountDto;
    const findWeaponQuery = this.accountRepository
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.cloundinary", "cloundinary")
      .leftJoinAndSelect("account.user", "user")
      .leftJoinAndSelect("account.tags", "tag");
    // if (weapon) {
    //   weapon.split(",").forEach((data) => {
    //     findWeaponQuery.andWhere("account.weapon ILIKE :data", {
    //       data: `%${data}%`,
    //     });
    //   });
    // }
    const [total, data] = await Promise.all([
      findWeaponQuery.getCount(),
      findWeaponQuery.offset(offset).limit(limit).getMany(),
    ]);
    // const total = await findWeaponQuery.getCount();
    // const data = await findWeaponQuery.offset(offset).limit(limit).getMany();
    return {
      total,
      data,
    };
  }

  async queryAccountByTag(
    queryAccountTag: QueryAccountByTagDto
  ): Promise<Account[]> {
    const { tags } = queryAccountTag;
    const queryAccount = this.accountRepository
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.tags", "tag");
    return queryAccount.getMany();
  }

  async removeAccount(id: string) {
    const account = await this.accountRepository.findOne({ id });
    if (!id)
      throw new HttpException(ACCOUNT_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
    const deleteMultiFile = account.cloundinary.map((cloud) => {
      return this.cloundinaryService.deleteFile(cloud.public_id);
    });
    await Promise.all([...deleteMultiFile]);
    return this.accountRepository.delete(account);
  }

  async buyAccountByUser(user: User, id: string) {
    return this.connection.transaction(async () => {
      const account = await this.accountRepository.checkExistAccount(id);
      if (account.status === ACCOUNT_STATUS.SOLD || account.soldAt) {
        throw new HttpException(ACCOUNT_MESSAGE.SOLD, HttpStatus.BAD_GATEWAY);
      }
      account.status = ACCOUNT_STATUS.SOLD;
      account.soldAt = new Date();
      if (user.money < account.newPrice) {
        throw new HttpException(
          AUDIT_MESSAGE.NOT_ENOUGH,
          HttpStatus.BAD_GATEWAY
        );
      }
      user.money = user.money - account.newPrice;
      const listImage = account.cloundinary.map(
        (cl) => cl.secure_url || cl.url
      );
      await Promise.all([
        this.userRepository.save(user),
        this.accountRepository.save(account),
        this.mailerService.sendBuyAccountFromUser(
          TIM_DANG_EMAIL,
          account,
          user.username,
          listImage
        ),
        this.historyService.createHistoryBuyAccount({
          account,
          username: user.username,
        }),
      ]);
      return "CC tao";
    });
  }
}
