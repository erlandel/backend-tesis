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
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const excel_dto_1 = require("../Application/Excel/excel.dto");
const excel_service_1 = require("../Infrastrutcure/excel.service");
let ExcelController = class ExcelController {
    excelService;
    constructor(excelService) {
        this.excelService = excelService;
    }
    async createExcel(excelData, file, res) {
        const excel = await this.excelService.createExcel(excelData, file);
        if (excel === null) {
            return res.status(400).json({
                message: 'No se pudo crear el Excel'
            });
        }
        return res.status(200).json({
            data: excel,
            message: 'Excel creado con exito'
        });
    }
    async DownloadExcelbyId(id, res) {
        const excel = await this.excelService.getExcelbyId(id);
        if (!excel) {
            return res.status(404).json({
                message: 'No se encontró el Excel con ese id'
            });
        }
        if (excel.route) {
            return res.sendFile(excel.route);
        }
        return res.status(200).json({
            data: excel,
            file: null
        });
    }
    async GetExcelById(id, res) {
        const excel = await this.excelService.getExcelbyId(id);
        if (!excel) {
            return res.status(404).json({
                message: 'No se encontro el Excel con ese id'
            });
        }
        return res.status(200).json({
            data: excel,
            message: 'Excel encontrado'
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Mi archivo' },
                modelType: { type: 'string', example: 'tipo1' },
                description: { type: 'string', example: 'Descripción del archivo' },
                file: { type: 'string', format: 'binary' },
            },
            required: ['name', 'modelType', 'description', 'file'],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)('file')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [excel_dto_1.ExcelDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "createExcel", null);
__decorate([
    (0, common_1.Get)('downloadExcel/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Archivo Excel',
        schema: {
            type: 'string',
            format: 'binary',
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Descargar un Excel por su id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "DownloadExcelbyId", null);
__decorate([
    (0, common_1.Get)('GetExcelById/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un Excel por su id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "GetExcelById", null);
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