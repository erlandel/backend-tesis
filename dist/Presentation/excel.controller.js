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
exports.ExcelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const excel_dto_1 = require("../Application/Excel/excel.dto");
const excel_service_1 = require("../Infrastrutcure/excel.service");
let ExcelController = class ExcelController {
    excelService;
    constructor(excelService) {
        this.excelService = excelService;
    }
    async createExcel(excelData) {
        this.excelService.createExcel(excelData);
    }
    async getExcelbyId(id, res) {
        const excel = await this.excelService.getExcelbyId(id);
        if (!excel) {
            return res.status(404).json({
                message: 'No se encontró el Excel con ese id'
            });
        }
        return res.status(200).json({
            data: excel
        });
    }
    async getAllExcel(res) {
        res.status(200).json({
            data: await this.excelService.getAllExcel()
        });
    }
};
exports.ExcelController = ExcelController;
__decorate([
    (0, common_1.Post)('createExcel'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo Excel' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [excel_dto_1.ExcelDto]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "createExcel", null);
__decorate([
    (0, common_1.Get)('getExcelbyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un Excel por su id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "getExcelbyId", null);
__decorate([
    (0, common_1.Get)('getAllExcel'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los Excel' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "getAllExcel", null);
exports.ExcelController = ExcelController = __decorate([
    (0, swagger_1.ApiTags)('excel'),
    (0, common_1.Controller)('Excel'),
    __metadata("design:paramtypes", [excel_service_1.ExcelService])
], ExcelController);
//# sourceMappingURL=excel.controller.js.map