// import {MigrationInterface, QueryRunner} from "typeorm";
// import * as fs from  'fs'
// import { changeToSlug } from "@/post";

// export class generateWeaponVietnamese1653357366373 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//             DELETE FROM tag WHERE type = 'WEAPON'
//         `)
//         const jsonsInDir = fs.readdirSync('./db/weapons')
//         const vietnameseWeaponList = []
//         jsonsInDir.forEach(path=>{
//           const data = fs.readFileSync('./db/weapons/' + path)
//           const {name,description,weapontype,rarity,baseatk,substat,subvalue,effectname,effect} = JSON.parse(data.toString())
//             const slug = changeToSlug(name)
//             const information = JSON.stringify({description,weapontype,rarity,baseatk,substat,subvalue,effectname,effect})
//           vietnameseWeaponList.push({slug,title:name,information})
//         })
//         await queryRunner.manager
//         .createQueryBuilder()
//         .insert()
//         .into('tag')
//         .values(vietnameseWeaponList)
//         .execute()
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }

// }
