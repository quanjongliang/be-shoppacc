import { CloundinaryService } from "@/cloudinary";
import {
  ACCOUNT_MESSAGE,
  BaseQueryResponse,
  NETWORK_MESSAGE,
  POST_CONFIG,
} from "@/core";
import {
  Account,
  ACCOUNT_RELATION,
  ACCOUNT_STATUS,
  TAG_TYPE,
  User,
} from "@/entity";
import { changeToSlug } from "@/post";
import { AccountRepository, TagRepository } from "@/repository";
import {
  DEFAULT_GENSHIN_IMPACT_TAG_SLUG,
  DEFAULT_GENSHIN_IMPACT_TAG_TITLE,
} from "@/tag";
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { Connection, ILike, In, IsNull } from "typeorm";
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
    private tagRepository: TagRepository
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
    user: User,
    files: Array<Express.Multer.File>
  ): Promise<Account> {
    return this.connection
      .transaction(async () => {
        const {
          code,
          char,
          weapon,
          server,
          game = DEFAULT_GENSHIN_IMPACT_TAG_TITLE,
        } = createAccountDto;
        const checkCodeAccount = await this.accountRepository.findOne({ code });
        if (checkCodeAccount) {
          throw new ConflictException(ACCOUNT_MESSAGE.CODE);
        }
        const cloundinary = files
          ? await this.cloundinaryService.uploadMultiFilesAccount(files)
          : null;
        const [charTag, weaponTag, serverTag, gameTag] = await Promise.all([
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
              title: ILike(server),
              type: TAG_TYPE.SERVER,
            },
          }),
          this.tagRepository.findOne({
            where: {
              title: ILike(game),
              type: TAG_TYPE.GAME,
            },
          }),
        ]);
        const imageUrl = cloundinary
          ? JSON.stringify(cloundinary.find((cl) => cl.isAvatar))
          : "";
        const newAccount = this.accountRepository.create({
          ...createAccountDto,
          user,
          cloundinary,
          imageUrl,
          code,
          server: serverTag.slug,
          game: gameTag.slug,
          character: charTag.map(({ slug }) => slug).join(","),
          weapon: weaponTag.map(({ slug }) => slug).join(","),
          tags: [...charTag, ...weaponTag, serverTag, gameTag],
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
      sort = "null",
      queryString = "",
      game = DEFAULT_GENSHIN_IMPACT_TAG_SLUG,
      startPrice = 0,
      endPrice,
      isSold = false,
    } = queryAccountDto;
    const isSoldValue = JSON.parse(isSold.toString());
    const sortValue = JSON.parse(sort.toString());
    const characterList = character.split(",") || [];
    const weaponList = weapon.split(",") || [];
    const findAccountQuery = this.accountRepository
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.cloundinary", "cloundinary")
      .leftJoinAndSelect("account.user", "user")
      .leftJoinAndSelect("account.tags", "tag")
      .andWhere("account.isDeleted = false")
      .andWhere("account.game =:game", { game })
      .take(limit)
      .skip(offset)
      .andWhere(`account.code ILIKE '%${queryString}%'`);
    weaponList.forEach((w) => {
      findAccountQuery.andWhere(`account.weapon ILIKE '%${w}%'`);
    });
    characterList.forEach((c) => {
      findAccountQuery.andWhere(`account.character  ILIKE '%${c}%'`);
    });
    findAccountQuery.andWhere(`account.server ILIKE '%${server}%'`);
    switch (sortValue) {
      case 0:
        findAccountQuery.addOrderBy("account.newPrice", "ASC");
        break;
      case 1:
        findAccountQuery.addOrderBy("account.newPrice", "DESC");
        break;
      case 2:
        findAccountQuery.addOrderBy("account.isSale", "DESC");
        findAccountQuery.addOrderBy("account.newPrice", "ASC");
        break;
      case 3:
        findAccountQuery.addOrderBy("account.newPrice", "ASC");
        findAccountQuery.andWhere("account.isSale = true");
        break;
      default:
        findAccountQuery.addOrderBy("account.createdAt", "DESC");
    }
    findAccountQuery.andWhere(`account.newPrice >= ${+startPrice} `);
    if (endPrice) {
      findAccountQuery.andWhere(` account.newPrice <= ${+endPrice}`);
    }
    if (isSoldValue) {
      findAccountQuery.orderBy("account.status", "DESC");
    }
    // const [total, data] = await Promise.all([
    //   findAccountQuery.getCount(),
    //   findAccountQuery.getMany(),
    // ]);
    const [data, total] = await findAccountQuery.getManyAndCount();
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
        const {
          code,
          char,
          weapon,
          server,
          game = DEFAULT_GENSHIN_IMPACT_TAG_TITLE,
          ...updateAccount
        } = updateAccountDto;
        if (code !== account.code) {
          const checkCodeAccount = await this.accountRepository.findOne({
            code,
          });
          if (checkCodeAccount) {
            throw new ConflictException(ACCOUNT_MESSAGE.CODE);
          }
          account.code = code;
        }
        const gameTag = await this.tagRepository.findOne({
          where: {
            title: ILike(game),
            type: TAG_TYPE.GAME,
          },
        });
        account.game = gameTag.slug;
        const tags = [gameTag];
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
          account.weapon = weaponTag.map(({ slug }) => slug).join(",");
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
          account.imageUrl = JSON.stringify(
            cloudinary.find((cl) => cl.isAvatar)
          );
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
      relations: [
        ACCOUNT_RELATION.CLOUNDINARY,
        ACCOUNT_RELATION.TAG,
        ACCOUNT_RELATION.USER,
      ],
    });
  }
}
