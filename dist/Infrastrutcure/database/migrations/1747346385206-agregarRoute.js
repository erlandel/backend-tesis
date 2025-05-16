"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregarRoute1747346385206 = void 0;
class AgregarRoute1747346385206 {
    name = 'AgregarRoute1747346385206';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Excel" ADD "route" character varying NOT NULL DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Excel" DROP COLUMN "route"`);
    }
}
exports.AgregarRoute1747346385206 = AgregarRoute1747346385206;
//# sourceMappingURL=1747346385206-agregarRoute.js.map