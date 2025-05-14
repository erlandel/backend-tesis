import { MigrationInterface, QueryRunner } from "typeorm";

export class ActualizarTablaExcel1747251098481 implements MigrationInterface {
    name = 'ActualizarTablaExcel1747251098481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "Excel_id_seq" OWNED BY "Excel"."id"`);
        await queryRunner.query(`ALTER TABLE "Excel" ALTER COLUMN "id" SET DEFAULT nextval('"Excel_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Excel" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "Excel_id_seq"`);
    }

}
