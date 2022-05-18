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
exports.HistoryService = void 0;
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const util_1 = require("../util");
let HistoryService = class HistoryService {
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    async createHistoryAmountTransferred(createHistory) {
        const historyMessage = (0, util_1.getHistoryAmountTransferredMessage)(createHistory);
        return this.historyRepository.save(this.historyRepository.create({
            historyMessage,
            type: entity_1.HISTORY_TYPE.AMOUNT_TRANSFERRED,
        }));
    }
    async createHistoryChangeStatusAudit(createHistory) {
        const historyMessage = (0, util_1.getHistoryConfirmMessage)(createHistory);
        return this.historyRepository.save(this.historyRepository.create({
            historyMessage,
            type: entity_1.HISTORY_TYPE.CHANGE_STATUS_AUDIT,
        }));
    }
    async createHistoryCreateAudit(createHistory) {
        const historyMessage = (0, util_1.getHistoryCreateAuditMessage)(createHistory);
        return this.historyRepository.save(this.historyRepository.create({
            historyMessage,
            type: entity_1.HISTORY_TYPE.CREATE_AUDIT,
        }));
    }
    async createHistoryChangeRole(createHistory) {
        const historyMessage = (0, util_1.getHistoryChangeRoleMessage)(createHistory);
        return this.historyRepository.save(this.historyRepository.create({
            historyMessage,
            type: entity_1.HISTORY_TYPE.CHANGE_ROLE,
        }));
    }
    async createHistoryBuyAccount(createHistory) {
        const historyMessage = (0, util_1.getHistoryBuyAccountMessage)(createHistory);
        return this.historyRepository.save(this.historyRepository.create({
            historyMessage,
            type: entity_1.HISTORY_TYPE.BUY_ACCOUNT_BY_USER,
        }));
    }
    async queryHistory(queryHistory) {
        const { offset = core_1.DEFAULT_CONFIG.OFFSET, limit = core_1.DEFAULT_CONFIG.LIMIT } = queryHistory;
        const findHistoryQuery = this.historyRepository
            .createQueryBuilder('history')
            .offset(offset)
            .limit(limit);
        const [total, data] = await Promise.all([
            this.historyRepository.count(),
            findHistoryQuery.getMany(),
        ]);
        return { total, data };
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.HistoryRepository])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map