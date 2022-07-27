// import {MigrationInterface, QueryRunner} from "typeorm";

// export class updateIsSaleForAccount1654077326601 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await Promise.all([
//             queryRunner.query(
//                 `
//                 update "account" set "isSale" = true where "oldPrice"  > "newPrice" 
//                 `
//             ),
//             queryRunner.query(
//                 `
//                 update "account" set "isSale" = false where "oldPrice" <= "newPrice" 
//                 `
//             )
//         ])
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }

// }
