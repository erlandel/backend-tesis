"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NombreMigracionSIGIES1746636854184 = void 0;
class NombreMigracionSIGIES1746636854184 {
    name = 'NombreMigracionSIGIES1746636854184';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "studentFuc" ("lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "ci_student" character varying(11) NOT NULL, "province" character varying NOT NULL, "gender" character varying NOT NULL, "nationality" character varying NOT NULL, "address" character varying NOT NULL, "municipality" character varying NOT NULL, "skinColor" character varying NOT NULL, CONSTRAINT "PK_4670c2d3706b5f7cfd11c64e64b" PRIMARY KEY ("ci_student"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "studentFuc"`);
    }
}
exports.NombreMigracionSIGIES1746636854184 = NombreMigracionSIGIES1746636854184;
//# sourceMappingURL=1746636854184-NombreMigracionSIGIES.js.map