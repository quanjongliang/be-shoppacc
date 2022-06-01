import { MigrationInterface, QueryRunner } from "typeorm";

export class deleteNotRarity5Weapon1653374608398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        delete  from tag   where "type" ='WEAPON' and tag.information not like '%"rarity":"5"%'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
