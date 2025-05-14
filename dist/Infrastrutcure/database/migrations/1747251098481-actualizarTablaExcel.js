"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarTablaExcel1747251098481 = void 0;
class ActualizarTablaExcel1747251098481 {
    name = 'ActualizarTablaExcel1747251098481';
    async up(queryRunner) {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "Excel_id_seq" OWNED BY "Excel"."id"`);
        await queryRunner.query(`ALTER TABLE "Excel" ALTER COLUMN "id" SET DEFAULT nextval('"Excel_id_seq"')`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Excel" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "Excel_id_seq"`);
    }
}
exports.ActualizarTablaExcel1747251098481 = ActualizarTablaExcel1747251098481;
//# sourceMappingURL=1747251098481-actualizarTablaExcel.js.map