import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarRoute1747346385206 implements MigrationInterface {
    name = 'AgregarRoute1747346385206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Excel" ADD "route" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Excel" DROP COLUMN "route"`);
    }

}
