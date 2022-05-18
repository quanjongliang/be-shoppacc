"use strict";
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
exports.createServerTag1652837181649 = void 0;
const entity_1 = require("../src/entity");
class createServerTag1652837181649 {
    async up(queryRunner) {
        const listServerTag = [
            {
                title: 'America',
                description: 'America Server',
                type: entity_1.TAG_TYPE.SERVER,
            },
            {
                title: 'Europe',
                description: 'Europe Server',
                type: entity_1.TAG_TYPE.SERVER,
            },
            {
                title: 'Asia',
                description: 'Asia Server',
                type: entity_1.TAG_TYPE.SERVER,
            },
            {
                title: 'TW, HK, MO',
                description: 'TW, HK, MO Server',
                type: entity_1.TAG_TYPE.SERVER,
            },
        ];
        const saveServerList = listServerTag.map((server) => {
            const { title, type } = server, inf = __rest(server, ["title", "type"]);
            const information = JSON.stringify(inf);
            return {
                title,
                type,
                information,
                slug: title.toLowerCase(),
            };
        });
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('tag')
            .values(saveServerList)
            .execute();
    }
    async down(queryRunner) { }
}
exports.createServerTag1652837181649 = createServerTag1652837181649;
//# sourceMappingURL=1652837181649-createServerTag.js.map