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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ExcelDto {
    name;
    modelType;
    description;
}
exports.ExcelDto = ExcelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del archivo Excel' }),
    __metadata("design:type", String)
], ExcelDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de modelo al que aplica' }),
    __metadata("design:type", String)
], ExcelDto.prototype, "modelType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción opcional' }),
    __metadata("design:type", String)
], ExcelDto.prototype, "description", void 0);
//# sourceMappingURL=excel.dto.js.map