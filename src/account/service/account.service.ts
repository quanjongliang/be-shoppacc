import { CloundinaryService } from "@/cloudinary";
import {
  ACCOUNT_MESSAGE,
  AUDIT_MESSAGE,
  BaseQueryResponse,
  NETWORK_MESSAGE,
  POST_CONFIG,
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
import { MailerService, MAILER_TEMPLATE_ENUM } from "@/mailer";
import { changeToSlug } from "@/post";
import { AccountRepository, TagRepository, UserRepository } from "@/repository";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { Connection, In, IsNull } from "typeorm";
import {
  CreateAccountDto,
  QueryAccountDto,
  QueryDetailsAccountDto,
  QueryWishListAccountDto,
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
    return this.connection
      .transaction(async () => {
        const { code, char, weapon, server } = createAccountDto;
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
              title: In(char.split(",")),
              type: TAG_TYPE.CHARACTER,
            },
          }),
          this.tagRepository.find({
            where: {
              title: In(weapon.split(",")),
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
        const imageUrl = cloundinary ? JSON.stringify(cloundinary[0]) : "";
        const newAccount = this.accountRepository.create({
          ...createAccountDto,
          user,
          cloundinary,
          imageUrl,
          code,
          server: serverTag.slug,
          character: charTag.map(({ slug }) => slug).join(","),
          weapon: weaponTag.map(({ slug }) => slug).join(","),
          tags: [...charTag, ...weaponTag, serverTag],
          slug: changeToSlug(createAccountDto.name, new Date()),
        });
        return this.accountRepository.save(newAccount);
      })
      .catch((err) => {
        console.log(err);
        const message =
          err.message === ACCOUNT_MESSAGE.CODE
            ? ACCOUNT_MESSAGE.CODE
            : NETWORK_MESSAGE.ERROR;
        throw new BadRequestException(message);
      });
  }

  async queryAccount(
    queryAccountDto: QueryAccountDto
  ): Promise<BaseQueryResponse<Account>> {
    const {
      offset = 0,
      limit = POST_CONFIG.LIMIT,
      weapon = "",
      server = "",
      character = "",
      sort,
    } = queryAccountDto;
    const sortValue = JSON.parse(sort.toString());
    const findWeaponQuery = this.accountRepository
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.cloundinary", "cloundinary")
      .leftJoinAndSelect("account.user", "user")
      .leftJoinAndSelect("account.tags", "tag")
      .andWhere("account.isDeleted = false")
      .take(limit)
      .skip(offset)
      .addOrderBy("account.createdAt", "DESC");
    // .loadRelationCountAndMap(
    //   "account.countCharacter",
    //   "account.tags",
    //   "tag",
    //   (qb) => qb.where("tag.type = :type", { type: TAG_TYPE.CHARACTER })
    // )
    // .loadRelationCountAndMap(
    //   "account.countWeapon",
    //   "account.tags",
    //   "tag",
    //   (qb) => qb.where("tag.type = :type", { type: TAG_TYPE.WEAPON })
    // );
    if (weapon) {
      weapon.split(",").forEach((data) => {
        findWeaponQuery.andWhere("account.weapon ILIKE :data", {
          data: `%${data}%`,
        });
      });
    }
    if (server) {
      server.split(",").forEach((data, index) => {
        index === 0
          ? findWeaponQuery.andWhere("account.server ILIKE :data", {
              data: `%${data}%`,
            })
          : findWeaponQuery.orWhere("account.server ILIKE :data", {
              data: `%${data}%`,
            });
      });
    }
    if (character) {
      character.split(",").forEach((data) => {
        findWeaponQuery.andWhere("account.character ILIKE :data", {
          data: `%${data}%`,
        });
      });
    }
    if (sortValue) {
      findWeaponQuery.addOrderBy(
        "account.newPrice",
        sortValue === 0 ? "ASC" : "DESC"
      );
    }
    const [total, data] = await Promise.all([
      findWeaponQuery.getCount(),
      findWeaponQuery.getMany(),
    ]);

    return {
      total,
      data,
    };
  }

  async removeAccount(account: Account) {
    return this.connection
      .transaction(async () => {
        const deleteMultiFile = account.cloundinary.map((cloud) => {
          return this.cloundinaryService.deleteFile(cloud.public_id);
        });
        return Promise.all([
          ...deleteMultiFile,
          this.accountRepository.save({
            ...account,
            tags: [],
            isDeleted: true,
            code: `${account.code}${new Date().getTime()}`,
          }),
          // this.accountRepository.delete(account),
        ]);
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestException(NETWORK_MESSAGE.ERROR);
      });
  }

  async buyAccountByUser(user: User, id: string) {
    return this.connection.transaction(async () => {
      const account = await this.accountRepository.checkExistAccount(id);
      if (account.status === ACCOUNT_STATUS.SOLD || account.soldAt) {
        throw new HttpException(ACCOUNT_MESSAGE.SOLD, HttpStatus.BAD_GATEWAY);
      }
      account.status = ACCOUNT_STATUS.SOLD;
      account.soldAt = new Date();
      account.boughtBy = user.username;
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

  async queryDetailsAccount(
    queryDetails: QueryDetailsAccountDto
  ): Promise<Account> {
    const { id, slug } = queryDetails;
    return this.accountRepository.findOne({
      where: [{ id }, { slug }],
      relations: [
        ACCOUNT_RELATION.TAG,
        ACCOUNT_RELATION.CLOUNDINARY,
        ACCOUNT_RELATION.USER,
      ],
    });
  }

  async updateAccount(
    account: Account,
    updateAccountDto: UpdateAccountDto,
    files?: Array<Express.Multer.File>
  ) {
    return this.connection
      .transaction(async () => {
        const { code, char, weapon, server, ...updateAccount } =
          updateAccountDto;
        if (code !== account.code) {
          const checkCodeAccount = await this.accountRepository.findOne({
            code,
          });
          if (checkCodeAccount) {
            throw new ConflictException(ACCOUNT_MESSAGE.CODE);
          }
          account.code = code;
        }
        const tags = [];
        if (char) {
          const charTag = await this.tagRepository.find({
            where: {
              title: In(char.split(",")),
              type: TAG_TYPE.CHARACTER,
            },
          });
          tags.push(...charTag);
          account.character = charTag.map(({ slug }) => slug).join(",");
        }
        if (server) {
          const serverTag = await this.tagRepository.findOne({
            where: {
              title: server,
              type: TAG_TYPE.SERVER,
            },
          });
          tags.push(serverTag);
          account.server = serverTag.slug;
        }
        if (weapon) {
          const weaponTag = await this.tagRepository.find({
            where: {
              title: In(weapon.split(",")),
              type: TAG_TYPE.WEAPON,
            },
          });
          tags.push(...weaponTag);
          account.character = weaponTag.map(({ slug }) => slug).join(",");
        }
        if (tags.length > 0) {
          account.tags = tags;
        }
        if (files && files.length > 0) {
          const [_res, cloudinary] = await Promise.all([
            this.cloundinaryService.deleteMultiFile(
              account.cloundinary.map((cl) => cl.public_id)
            ),
            this.cloundinaryService.uploadMultiFilesAccount(files),
          ]);
          account.cloundinary = cloudinary;
        }
        return this.accountRepository.save({
          ...account,
          ...updateAccount,
          slug: changeToSlug(updateAccount.name, new Date()),
        });
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestException(NETWORK_MESSAGE.ERROR);
      });
  }

  async queryWishListAccount(
    queryWishList: QueryWishListAccountDto
  ): Promise<Account[]> {
    const { ids } = queryWishList;
    return this.accountRepository.find({
      where: {
        id: In(ids.split(",")),
        isDeleted: false,
        soldAt: IsNull(),
      },
    });
  }
}
