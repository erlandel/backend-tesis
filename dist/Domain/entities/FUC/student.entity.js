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
exports.StudentFuc = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let StudentFuc = class StudentFuc {
    primer_apellido;
    segundo_apellido;
    primer_nombre;
    segundo_nombre;
    identidad_numero;
    provincia_residencia;
    sexo;
    ciudadania;
    direccion;
    municipio_residencia;
    color_piel;
};
exports.StudentFuc = StudentFuc;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apellido del estudiante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentFuc.prototype, "primer_apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Segundo apellido del estudiante' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "segundo_apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Nombre del estudiante' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "primer_nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Segundo nombre del estudiante', nullable: true }),
    __metadata("design:type", String)
], StudentFuc.prototype, "segundo_nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'carnet de identidad' }),
    (0, typeorm_1.PrimaryColumn)({ length: 11, name: 'identidad_numero' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "identidad_numero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Provincia' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "provincia_residencia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Género' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Nacionalidad' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "ciudadania", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Dirección' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Municipio' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "municipio_residencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Color de piel' }),
    __metadata("design:type", String)
], StudentFuc.prototype, "color_piel", void 0);
exports.StudentFuc = StudentFuc = __decorate([
    (0, typeorm_1.Entity)('studentFuc')
], StudentFuc);
//# sourceMappingURL=student.entity.js.map