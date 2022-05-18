"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const mailer_1 = require("../../mailer");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const typeorm_1 = require("typeorm");
const history_1 = require("../../history");
let AuditService = class AuditService {
    constructor(auditRepository, userRepository, auditInformationRepository, mailerService, connection, historyService) {
        this.auditRepository = auditRepository;
        this.userRepository = userRepository;
        this.auditInformationRepository = auditInformationRepository;
        this.mailerService = mailerService;
        this.connection = connection;
        this.historyService = historyService;
    }
    async createNewAudit(user, createAuditDto) {
        return this.connection
            .transaction(async () => {
            const { auditInformation, username, password } = createAuditDto, newAudit = __rest(createAuditDto, ["auditInformation", "username", "password"]);
            const auditInformations = await this.auditInformationRepository.createAuditInformations(auditInformation);
            const audit = this.auditRepository.create(Object.assign({ user,
                auditInformations }, newAudit));
            const savedAudit = await this.auditRepository.save(audit);
            await this.mailerService.sendAuditStoneMail('lhongquan.1998@gmail.com', user.username, username, password, newAudit.server, newAudit.UID, auditInformations, savedAudit.total, newAudit.note);
            await this.historyService.createHistoryCreateAudit({
                UID: newAudit.UID,
                username: user.username,
            });
            return Promise.all([
                this.auditRepository.save(audit),
                this.mailerService.sendAuditStoneMail('lhongquan.1998@gmail.com', user.username, username, password, newAudit.server, newAudit.UID, auditInformations, savedAudit.total, newAudit.note),
                this.historyService.createHistoryCreateAudit({
                    UID: newAudit.UID,
                    username: user.username,
                }),
            ]);
        })
            .catch((err) => {
            console.log(err);
            throw new common_1.HttpException(core_1.HISTORY_MESSAGE.NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createAuditByAdmin(user, createAuditByAdminDto) {
        return this.connection
            .transaction(async () => {
            const { username } = createAuditByAdminDto, createAudit = __rest(createAuditByAdminDto, ["username"]);
            const userAudit = await this.userRepository.findOne({
                username,
            });
            if (!userAudit)
                throw new common_1.HttpException(core_1.AUTH_MESSAGE.USER.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
            const oldMoney = (userAudit === null || userAudit === void 0 ? void 0 : userAudit.money) || 0;
            let newMoney = +oldMoney;
            if (createAudit.typeTransfer === dto_1.TYPE_TRANSFER.MINUS) {
                newMoney = newMoney - createAudit.amountTransferred;
                if (newMoney < 0) {
                    throw new common_1.HttpException(core_1.AUDIT_MESSAGE.NOT_ENOUGH, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (createAudit.typeTransfer === dto_1.TYPE_TRANSFER.PLUS) {
                newMoney = newMoney + createAudit.amountTransferred;
            }
            userAudit.money = newMoney;
            return Promise.all([
                this.userRepository.save(userAudit),
                this.auditRepository.save(Object.assign({ user: userAudit }, createAudit)),
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
            throw new common_1.HttpException(core_1.HISTORY_MESSAGE.NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async queryAuditByUser(queryAuditDto, user) {
        const { limit = core_1.DEFAULT_CONFIG.LIMIT, offset = core_1.DEFAULT_CONFIG.OFFSET, status = '', } = queryAuditDto;
        const where = {};
        if (user) {
            where['user'] = user;
        }
        if (status) {
            where['status'] = status;
        }
        const [total, data] = await Promise.all([
            this.auditRepository.count({ where }),
            this.auditRepository.find({
                take: limit,
                skip: offset,
                where,
                relations: [entity_1.AUDIT_RELATION.USER, entity_1.AUDIT_RELATION.AUDIT_INFORMATIONS],
            }),
        ]);
        return {
            total,
            data,
        };
    }
    async updateStatusAudit(user, id) {
        return this.connection
            .transaction(async () => {
            const audit = await this.auditRepository.findOne({
                status: entity_1.AUDIT_STATUS.PENDING,
                id,
            });
            if (!audit)
                throw new common_1.HttpException(core_1.AUDIT_MESSAGE.STATUS_NOT_FOUND, common_1.HttpStatus.CONFLICT);
            return Promise.all([
                this.historyService.createHistoryChangeStatusAudit({
                    UID: audit.UID,
                    admin: user.username,
                    username: audit.user.username,
                }),
                this.auditRepository.update({ id }, { status: entity_1.AUDIT_STATUS.COMPLETED }),
            ]);
        })
            .catch((err) => {
            console.log(err);
            throw new common_1.HttpException(core_1.HISTORY_MESSAGE.NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.AuditRepository,
        repository_1.UserRepository,
        repository_1.AuditInformationRepository,
        mailer_1.MailerService,
        typeorm_1.Connection,
        history_1.HistoryService])
], AuditService);
exports.AuditService = AuditService;
//# sourceMappingURL=audit.service.js.map