"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Excel_entity_1 = require("./entities/Excel.entity");
const excel_controller_1 = require("../Presentation/excel.controller");
const excel_service_1 = require("../Infrastrutcure/excel.service");
let ExcelModule = class ExcelModule {
};
exports.ExcelModule = ExcelModule;
exports.ExcelModule = ExcelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Excel_entity_1.Excel])],
        controllers: [excel_controller_1.ExcelController],
        providers: [excel_service_1.ExcelService],
    })
], ExcelModule);
//# sourceMappingURL=excel.module.js.map