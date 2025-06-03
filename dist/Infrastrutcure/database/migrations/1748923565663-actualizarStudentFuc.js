"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarStudentFuc1748923565663 = void 0;
class ActualizarStudentFuc1748923565663 {
    name = 'ActualizarStudentFuc1748923565663';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "studentFuc" ("primer_apellido" character varying NOT NULL, "segundo_apellido" character varying NOT NULL, "primer_nombre" character varying NOT NULL, "segundo_nombre" character varying, "identidad_numero" character varying(11) NOT NULL, "provincia_residencia" character varying NOT NULL, "sexo" character varying NOT NULL, "ciudadania" character varying NOT NULL, "direccion" character varying NOT NULL, "municipio_residencia" character varying NOT NULL, "color_piel" character varying, CONSTRAINT "PK_4670c2d3706b5f7cfd11c64e64b" PRIMARY KEY ("ci_student"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "studentFuc"`);
    }
}
exports.ActualizarStudentFuc1748923565663 = ActualizarStudentFuc1748923565663;
//# sourceMappingURL=1748923565663-actualizarStudentFuc.js.map