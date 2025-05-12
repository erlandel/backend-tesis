import { MigrationInterface, QueryRunner } from "typeorm";

export class NombreMigracionSIGIES1746636854184 implements MigrationInterface {
    name = 'NombreMigracionSIGIES1746636854184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "studentFuc" ("lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "ci_student" character varying(11) NOT NULL, "province" character varying NOT NULL, "gender" character varying NOT NULL, "nationality" character varying NOT NULL, "address" character varying NOT NULL, "municipality" character varying NOT NULL, "skinColor" character varying NOT NULL, CONSTRAINT "PK_4670c2d3706b5f7cfd11c64e64b" PRIMARY KEY ("ci_student"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "studentFuc"`);
    }

}
