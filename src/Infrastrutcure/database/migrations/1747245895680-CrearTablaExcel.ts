import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaExcel1747245895680 implements MigrationInterface {
    name = 'CrearTablaExcel1747245895680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Excel" ("id" integer NOT NULL, "name" character varying NOT NULL, "modelType" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b0d9b0bf4310550975bd7bc5c32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ADD "academicIndex" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD "origin" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD "situation" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "skin_color" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "skin_color" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "situation"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "academicIndex"`);
        await queryRunner.query(`DROP TABLE "Excel"`);
    }

}
