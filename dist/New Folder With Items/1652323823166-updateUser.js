"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser1652323823166 = void 0;
const core_1 = require("../src/core");
const entity_1 = require("../src/entity");
const reader = require("xlsx");
class updateUser1652323823166 {
    async up(queryRunner) {
        const file = reader.readFile('./db/oldUser.xlsx');
        const adminPassword = await (0, core_1.hashedPassword)('admin');
        const sheets = file.SheetNames;
        let data = [];
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
            temp.forEach(({ username, email, phone, role, password }) => {
                const truePhone = phone ? +`0${phone}` : '';
                const trueRole = role === '1' ? entity_1.USER_ROLE.ADMIN : entity_1.USER_ROLE.USER;
                data.push({
                    username,
                    email,
                    phone: truePhone,
                    role: trueRole,
                    password: trueRole === entity_1.USER_ROLE.ADMIN ? adminPassword : password,
                    confirmedEmail: true,
                });
            });
        }
        data.push({
            username: 'admintim',
            email: core_1.TIM_DANG_EMAIL,
            role: entity_1.USER_ROLE.ADMIN,
            password: adminPassword,
            confirmedEmail: true,
            money: 99999999999999,
        });
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('user')
            .values(data)
            .execute();
    }
    async down(queryRunner) { }
}
exports.updateUser1652323823166 = updateUser1652323823166;
//# sourceMappingURL=1652323823166-updateUser.js.map