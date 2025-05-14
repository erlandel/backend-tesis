"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearTablaExcel1747245895680 = void 0;
class CrearTablaExcel1747245895680 {
    name = 'CrearTablaExcel1747245895680';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "Excel" ("id" integer NOT NULL, "name" character varying NOT NULL, "modelType" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b0d9b0bf4310550975bd7bc5c32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ADD "academicIndex" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD "origin" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD "situation" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "skin_color" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "skin_color" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "situation"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "academicIndex"`);
        await queryRunner.query(`DROP TABLE "Excel"`);
    }
}
exports.CrearTablaExcel1747245895680 = CrearTablaExcel1747245895680;
//# sourceMappingURL=1747245895680-CrearTablaExcel.js.map