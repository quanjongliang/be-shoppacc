import {MigrationInterface, QueryRunner} from "typeorm";

export class updateIsSaleAccount1654057804818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            ALTER TABLE account
            ADD isSale BOOLEAN DEFAULT TRUE; 
            `
        )
        await Promise.all([
            queryRunner.query(
                `
                update "account" set "isSale" = true where "oldPrice"  > "newPrice" 
                `
            ),
            queryRunner.query(
                `
                update "account" set "isSale" = false where "oldPrice" <= "newPrice" 
                `
            )
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
