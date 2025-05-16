"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Excel_entity_1 = require("../Domain/entities/Excel.entity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
let ExcelService = class ExcelService {
    excelRepository;
    constructor(excelRepository) {
        this.excelRepository = excelRepository;
    }
    async createExcel(excelData, file) {
        const name = await this.excelRepository.findOneBy({ name: excelData.name });
        if (name !== null) {
            return null;
        }
        const directorioExcel = path.join(process.cwd(), 'src', 'excel');
        if (!fs.existsSync(directorioExcel)) {
            fs.mkdirSync(directorioExcel, { recursive: true });
        }
        let rutaArchivo = null;
        if (file) {
            const nombreArchivo = excelData.name || `excel_${Date.now()}.xlsx`;
            const nombreFinal = nombreArchivo.endsWith('.xlsx') ? nombreArchivo : `${nombreArchivo}.xlsx`;
            rutaArchivo = path.join(directorioExcel, nombreFinal);
            fs.writeFileSync(rutaArchivo, file.buffer);
        }
        const excel = this.excelRepository.create(excelData);
        if (rutaArchivo !== null) {
            excel.route = rutaArchivo;
        }
        await this.excelRepository.save(excel);
        return excel;
    }
    async getExcelbyId(id) {
        const student = await this.excelRepository.findOneBy({ id });
        if (!student) {
            return null;
        }
        return student;
    }
    async getAllExcel() {
        return await this.excelRepository.find();
    }
};
exports.ExcelService = ExcelService;
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Excel_entity_1.Excel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExcelService);
//# sourceMappingURL=excel.service.js.map