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
exports.History = exports.HISTORY_TYPE = exports.HISTORY_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
exports.HISTORY_TABLE_NAME = 'history';
var HISTORY_TYPE;
(function (HISTORY_TYPE) {
    HISTORY_TYPE["AMOUNT_TRANSFERRED"] = "AMOUNT_TRANSFERRED";
    HISTORY_TYPE["CREATE_AUDIT"] = "CREATE_AUDIT";
    HISTORY_TYPE["CHANGE_STATUS_AUDIT"] = "CHANGE_STATUS_AUDIT";
    HISTORY_TYPE["CHANGE_ROLE"] = "CHANGE_ROLE";
    HISTORY_TYPE["BUY_ACCOUNT_BY_USER"] = "BUY_ACCOUNT_BY_USER";
})(HISTORY_TYPE = exports.HISTORY_TYPE || (exports.HISTORY_TYPE = {}));
let History = class History extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ enum: HISTORY_TYPE }),
    __metadata("design:type", String)
], History.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, type: 'text' }),
    __metadata("design:type", String)
], History.prototype, "historyMessage", void 0);
History = __decorate([
    (0, typeorm_1.Entity)(exports.HISTORY_TABLE_NAME)
], History);
exports.History = History;
//# sourceMappingURL=history.entity.js.map