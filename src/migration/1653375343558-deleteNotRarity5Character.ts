import { MigrationInterface, QueryRunner } from "typeorm";

export class deleteNotRarity5Character1653375343558
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        from tag   where "type" ='CHARACTER' and tag.information not like '%"rarity":"5"%'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
