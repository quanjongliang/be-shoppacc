"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMoneyAdmin1652694879860 = void 0;
class updateMoneyAdmin1652694879860 {
    async up(queryRunner) {
        await queryRunner.query(`update "user" set "money" =999999999999 where username ='admintim'`);
    }
    async down(queryRunner) { }
}
exports.updateMoneyAdmin1652694879860 = updateMoneyAdmin1652694879860;
//# sourceMappingURL=1652694879860-updateMoneyAdmin.js.map