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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const cloudinary_1 = require("../../cloudinary");
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const history_1 = require("../../history");
const mailer_1 = require("../../mailer");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AccountService = class AccountService {
    constructor(accountRepository, cloundinaryService, connection, historyService, userRepository, mailerService, tagRepository) {
        this.accountRepository = accountRepository;
        this.cloundinaryService = cloundinaryService;
        this.connection = connection;
        this.historyService = historyService;
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.tagRepository = tagRepository;
    }
    async createAccount(createAccountDto, user, files) {
        return this.connection.transaction(async () => {
            const { ar, char, weapon } = createAccountDto;
            const cloundinary = await this.cloundinaryService.uploadMultiFilesAccount(files);
            const [charTag, weaponTag] = await Promise.all([
                this.tagRepository.find({
                    where: {
                        title: (0, typeorm_1.In)(char),
                        type: entity_1.TAG_TYPE.CHARACTER,
                    },
                }),
                this.tagRepository.find({
                    where: {
                        title: (0, typeorm_1.In)(weapon),
                        type: entity_1.TAG_TYPE.WEAPON,
                    },
                }),
            ]);
            const imageUrl = JSON.stringify(cloundinary.map((d) => d.url || d.secure_url));
            const newAccount = this.accountRepository.create(Object.assign(Object.assign({ ar }, createAccountDto), { user,
                cloundinary,
                imageUrl, tags: [...charTag, ...weaponTag] }));
            return this.accountRepository.save(newAccount);
        });
    }
    async queryAccount(queryAccountDto) {
        const { offset = 0, limit = core_1.POST_CONFIG.LIMIT, weapon } = queryAccountDto;
        const findWeaponQuery = this.accountRepository
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.cloundinary', 'cloundinary')
            .leftJoinAndSelect('account.user', 'user');
        if (weapon) {
            weapon.split(',').forEach((data) => {
                findWeaponQuery.andWhere('account.weapon ILIKE :data', {
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
    async removeAccount(id) {
        const account = await this.accountRepository.findOne({ id });
        if (!id)
            throw new common_1.HttpException(core_1.ACCOUNT_MESSAGE.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        const deleteMultiFile = account.cloundinary.map((cloud) => {
            return this.cloundinaryService.deleteFile(cloud.public_id);
        });
        return Promise.all([
            ...deleteMultiFile,
            this.accountRepository.delete(account),
        ]);
    }
    async buyAccountByUser(user, id) {
        return this.connection.transaction(async () => {
            const account = await this.accountRepository.checkExistAccount(id);
            if (account.status === entity_1.ACCOUNT_STATUS.SOLD || account.soldAt) {
                throw new common_1.HttpException(core_1.ACCOUNT_MESSAGE.SOLD, common_1.HttpStatus.BAD_GATEWAY);
            }
            account.status = entity_1.ACCOUNT_STATUS.SOLD;
            account.soldAt = new Date();
            if (user.money < account.newPrice) {
                throw new common_1.HttpException(core_1.AUDIT_MESSAGE.NOT_ENOUGH, common_1.HttpStatus.BAD_GATEWAY);
            }
            user.money = user.money - account.newPrice;
            const listImage = account.cloundinary.map((cl) => cl.secure_url || cl.url);
            return Promise.all([
                this.userRepository.save(user),
                this.accountRepository.save(account),
                this.mailerService.sendBuyAccountFromUser(core_1.TIM_DANG_EMAIL, account, user.username, listImage),
                this.historyService.createHistoryBuyAccount({
                    account,
                    username: user.username,
                }),
            ]);
        });
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.AccountRepository,
        cloudinary_1.CloundinaryService,
        typeorm_1.Connection,
        history_1.HistoryService,
        repository_1.UserRepository,
        mailer_1.MailerService,
        repository_1.TagRepository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map