"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarStudentFuc1748922750988 = void 0;
class ActualizarStudentFuc1748922750988 {
    name = 'ActualizarStudentFuc1748922750988';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "studentFuc" ("primer_apellido" character varying NOT NULL, "segundo_apellido" character varying NOT NULL, "primer_nombre" character varying NOT NULL, "segundo_nombre" character varying, "ci_student" character varying(11) NOT NULL, "provincia_residencia" character varying NOT NULL, "sexo" character varying NOT NULL, "ciudadania" character varying NOT NULL, "direccion" character varying NOT NULL, "municipio_residencia" character varying NOT NULL, "color_piel" character varying, CONSTRAINT "PK_4670c2d3706b5f7cfd11c64e64b" PRIMARY KEY ("ci_student"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "studentFuc"`);
    }
}
exports.ActualizarStudentFuc1748922750988 = ActualizarStudentFuc1748922750988;
//# sourceMappingURL=1748922750988-actualizarStudentFuc.js.map