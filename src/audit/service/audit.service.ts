import {
  AUDIT_MESSAGE,
  AUTH_MESSAGE,
  BaseQueryResponse,
  calculateTotalAudit,
  DEFAULT_CONFIG,
  HISTORY_MESSAGE,
  SHOP_EMAIL,
} from "@/core";
import {
  Audit,
  AUDIT_RELATION,
  AUDIT_STATUS,
  AUDIT_TYPE,
  History,
  User,
} from "@/entity";
import { MailerService, MAILER_TEMPLATE_ENUM } from "@/mailer";
import {
  AuditInformationRepository,
  AuditRepository,
  UserRepository,
} from "@/repository";
import { HttpStatus, Injectable, HttpException } from "@nestjs/common";
import {
  CreateAuditByAdminDto,
  CreateAuditDto,
  QueryAuditDto,
  TYPE_TRANSFER,
} from "../dto";
import { Connection } from "typeorm";
import { HistoryService } from "@/history";
@Injectable()
export class AuditService {
  constructor(
    private auditRepository: AuditRepository,
    private userRepository: UserRepository,
    private auditInformationRepository: AuditInformationRepository,
    private mailerService: MailerService,
    private connection: Connection,
    private historyService: HistoryService
  ) {}

  async createNewAudit(
    user: User,
    createAuditDto: CreateAuditDto
  ): Promise<[User, Audit, any, any, History]> {
    return this.connection
      .transaction(async () => {
        const { auditInformation, username, password, server, ...newAudit } =
          createAuditDto;
        const auditInformations =
          await this.auditInformationRepository.createAuditInformations(
            auditInformation
          );

        const audit = this.auditRepository.create({
          user,
          auditInformations,
          ...newAudit,
          username,
          password,
          server,
        });
        const total = calculateTotalAudit(auditInformations);
        if (user.money < total) {
          throw new HttpException(
            AUDIT_MESSAGE.NOT_ENOUGH,
            HttpStatus.BAD_REQUEST
          );
        }
        return Promise.all([
          this.userRepository.save({ ...user, money: user.money - total }),
          this.auditRepository.save({ ...audit, information: createAuditDto }),
          this.mailerService.sendAuditStoneMail({
            to: SHOP_EMAIL,
            username: user.username,
            gameUsername: username,
            password,
            server,
            UID: newAudit.UID,
            auditInformations,
            total,
            note: newAudit.note,
          }),
          this.mailerService.sendAuditStoneMail(
            {
              to: user.email,
              username: user.username,
              gameUsername: username,
              password,
              server,
              UID: newAudit.UID,
              auditInformations,
              total,
              note: newAudit.note,
            },
            MAILER_TEMPLATE_ENUM.AUDIT_STONE_TO_USER
          ),
          this.historyService.createHistoryCreateAudit({
            UID: newAudit.UID,
            username: user.username,
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createAuditByAdmin(
    user: User,
    createAuditByAdminDto: CreateAuditByAdminDto
  ): Promise<[User, Audit, History]> {
    return this.connection
      .transaction(async () => {
        const { username, ...createAudit } = createAuditByAdminDto;
        const userAudit = await this.userRepository.findOne({
          username,
        });
        if (!userAudit)
          throw new HttpException(
            AUTH_MESSAGE.USER.NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        const oldMoney = userAudit?.money || 0;
        let newMoney = +oldMoney;
        if (createAudit.typeTransfer === TYPE_TRANSFER.MINUS) {
          newMoney = newMoney - createAudit.amountTransferred;
          if (newMoney < 0) {
            throw new HttpException(
              AUDIT_MESSAGE.NOT_ENOUGH,
              HttpStatus.BAD_REQUEST
            );
          }
        }
        if (createAudit.typeTransfer === TYPE_TRANSFER.PLUS) {
          newMoney = newMoney + createAudit.amountTransferred;
        }
        userAudit.money = newMoney;
        return Promise.all([
          this.userRepository.save(userAudit),
          this.auditRepository.save({
            user: userAudit,
            ...createAudit,
            information: createAuditByAdminDto,
            type: createAudit?.typeAudit || AUDIT_TYPE.COIN,
          }),
          this.historyService.createHistoryAmountTransferred({
            admin: user.username,
            oldMoney,
            newMoney,
            username: userAudit.username,
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          HISTORY_MESSAGE.NOT_FOUND,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async queryAuditByUser(
    queryAuditDto: QueryAuditDto,
    user?: User
  ): Promise<BaseQueryResponse<Audit>> {
    const {
      limit = DEFAULT_CONFIG.LIMIT,
      offset = DEFAULT_CONFIG.OFFSET,
      status = "",
      type = AUDIT_TYPE.STONE,
      queryString = "",
    } = queryAuditDto;

    const queryAudit = this.auditRepository
      .createQueryBuilder("audit")
      .leftJoinAndSelect("audit.user", "user")
      .leftJoinAndSelect("audit.auditInformations", "auditInformation")
      .take(limit)
      .skip(offset)
      .where("audit.type = :type", { type })
      .orderBy("audit.createdAt", "DESC");

    if (status) {
      queryAudit.andWhere("audit.status = :status", { status });
    }
    if (user) {
      queryAudit.andWhere("user.id = :userId", { userId: user.id });
    }
    if (queryString) {
      queryAudit.andWhere(`user.username ILIKE '%${queryString}%'`);
    }
    const [data, total] = await queryAudit.getManyAndCount();
    return {
      total,
      data,
    };
  }

  async updateStatusAudit(user: User, id: string) {
    return this.connection
      .transaction(async () => {
        const audit = await this.auditRepository.findOne({
          where: {
            status: AUDIT_STATUS.PENDING,
            id,
          },
          relations: [AUDIT_RELATION.USER],
        });
        if (!audit)
          throw new HttpException(
            AUDIT_MESSAGE.STATUS_NOT_FOUND,
            HttpStatus.CONFLICT
          );
        const history =
          audit.type === AUDIT_TYPE.ACCOUNT
            ? this.historyService.createHistoryConfirmAccountBuyed({
                admin: user.username,
                total: audit.total,
                user: audit.user,
              })
            : this.historyService.createHistoryChangeStatusAudit({
                UID: audit.UID,
                admin: user.username,
                username: audit.user.username,
              });

        return Promise.all([
          history,
          this.auditRepository.update(
            { id },
            { status: AUDIT_STATUS.COMPLETED }
          ),
        ]);
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          HISTORY_MESSAGE.NOT_FOUND,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async getAuditById(id: string): Promise<Audit | undefined> {
    return this.auditRepository.findOne({
      where: { id },
      relations: [AUDIT_RELATION.AUDIT_INFORMATIONS, AUDIT_RELATION.USER],
    });
  }
}
