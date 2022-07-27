import { TAG_TYPE } from "@/entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class insertFirstGame1658887834019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const games = [{
            title:'Genshin impact',
            slug: 'gensin-impact',
            description: 'Genshin Impact là một trò chơi hành động nhập vai do miHoYo của Trung Quốc phát triển và được xuất bản lần đầu vào năm 2020. Genshin Impact là IP được miHoYo phát triển tiếp nối sau sản phẩm trước là series Honkai.',
            type:TAG_TYPE.GAME
        }]
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("tag")
        .values(games)
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
