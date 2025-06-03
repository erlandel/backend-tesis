"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarStudentFuc1748922481126 = void 0;
class ActualizarStudentFuc1748922481126 {
    name = 'ActualizarStudentFuc1748922481126';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "nationality"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "municipality"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "skinColor"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "primer_apellido" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "segundo_apellido" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "primer_nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "segundo_nombre" character varying`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "provincia_residencia" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "sexo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "ciudadania" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "direccion" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "municipio_residencia" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "color_piel" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "color_piel"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "municipio_residencia"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "direccion"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "ciudadania"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "sexo"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "provincia_residencia"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "segundo_nombre"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "primer_nombre"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "segundo_apellido"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" DROP COLUMN "primer_apellido"`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "skinColor" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "municipality" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "nationality" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "gender" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "province" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentFuc" ADD "lastName" character varying NOT NULL`);
    }
}
exports.ActualizarStudentFuc1748922481126 = ActualizarStudentFuc1748922481126;
//# sourceMappingURL=1748922481126-actualizarStudentFuc.js.map