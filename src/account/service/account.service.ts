import { CloundinaryService } from "@/cloudinary";
import {
  ACCOUNT_MESSAGE,
  AUDIT_MESSAGE,
  BaseQueryResponse,
  POST_CONFIG,
  TIM_DANG_EMAIL,
} from "@/core";
import { Account, ACCOUNT_STATUS, TAG_TYPE, User } from "@/entity";
import { HistoryService } from "@/history";
import { MailerService, MAILER_TEMPLATE_ENUM } from "@/mailer";
import { AccountRepository, TagRepository, UserRepository } from "@/repository";
import { ConflictException } from "@nestjs/common";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Connection, In } from "typeorm";
import { CreateAccountDto, QueryAccountDto } from "../dto";

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
      const { code, ar, char, weapon, server } = createAccountDto;
      const checkCodeAccount = await this.accountRepository.findOne({ code });
      if (checkCodeAccount) {
        throw new ConflictException(ACCOUNT_MESSAGE.CODE);
      }
      const cloundinary = files
        ? await this.cloundinaryService.uploadMultiFilesAccount(files)
        : null;
      const [charTag, weaponTag, serverTag] = await Promise.all([
        this.tagRepository.find({
          where: {
            title: In(char.split(',')),
            type: TAG_TYPE.CHARACTER,
          },
        }),
        this.tagRepository.find({
          where: {
            title: In(weapon.split(',')),
            type: TAG_TYPE.WEAPON,
          },
        }),
        this.tagRepository.findOne({
          where: {
            title: server,
            type: TAG_TYPE.SERVER,
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
        code,
        server: serverTag.slug,
        character: charTag.map(({ slug }) => slug).join(","),
        weapon: weaponTag.map(({ slug }) => slug).join(","),
        tags: [...charTag, ...weaponTag, serverTag],
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
      character = "",
    } = queryAccountDto;
    const findWeaponQuery = this.accountRepository
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.cloundinary", "cloundinary")
      .leftJoinAndSelect("account.user", "user")
      .leftJoinAndSelect("account.tags", "tag")
      .loadRelationCountAndMap(
        "account.countCharacter",
        "account.tags",
        "tag",
        (qb) => qb.where("tag.type = :type", { type: TAG_TYPE.CHARACTER })
      )
      .loadRelationCountAndMap(
        "account.countWeapon",
        "account.tags",
        "tag",
        (qb) => qb.where("tag.type = :type", { type: TAG_TYPE.WEAPON })
      );
    if (weapon) {
      weapon.split(",").forEach((data) => {
        findWeaponQuery.andWhere("account.weapon ILIKE :data", {
          data: `%${data}%`,
        });
      });
    }
    if (server) {
      findWeaponQuery.andWhere("account.server ILIKE :data", {
        data: `%${server}%`,
      });
    }
    if (character) {
      character.split(",").forEach((data) => {
        findWeaponQuery.andWhere("account.character ILIKE :data", {
          data: `%${data}%`,
        });
      });
    }
    const [total, data] = await Promise.all([
      findWeaponQuery.getCount(),
      findWeaponQuery.offset(offset).limit(limit).getMany(),
    ]);

    return {
      total,
      data,
    };
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
      account.boughtBy = user;
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
        this.mailerService.sendBuyAccountFromUser({
          to: TIM_DANG_EMAIL,
          account,
          username: user.username,
          listImage,
        }),
        this.mailerService.sendBuyAccountFromUser(
          {
            to: user.email,
            account,
            username: user.username,
            listImage,
          },
          MAILER_TEMPLATE_ENUM.BUY_ACCOUNT_TO_USER
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
