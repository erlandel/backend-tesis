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
exports.StudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StudentDto {
    lastName;
    firstName;
    ciStudent;
    province;
    gender;
    nationality;
    address;
    municipality;
    skinColor;
    preUniversity;
    admissionMethod;
    motherEducation;
    fatherEducation;
    motherOccupation;
    fatherOccupation;
    motherWorkSector;
    fatherWorkSector;
}
exports.StudentDto = StudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apellido del estudiante' }),
    __metadata("design:type", String)
], StudentDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del estudiante' }),
    __metadata("design:type", String)
], StudentDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de carnet de identidad (11 dígitos)' }),
    __metadata("design:type", String)
], StudentDto.prototype, "ciStudent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Provincia' }),
    __metadata("design:type", String)
], StudentDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Género' }),
    __metadata("design:type", String)
], StudentDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nacionalidad' }),
    __metadata("design:type", String)
], StudentDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dirección' }),
    __metadata("design:type", String)
], StudentDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Municipio' }),
    __metadata("design:type", String)
], StudentDto.prototype, "municipality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Color de piel' }),
    __metadata("design:type", String)
], StudentDto.prototype, "skinColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'nombre del preuniversitario' }),
    __metadata("design:type", String)
], StudentDto.prototype, "preUniversity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'metodo de admision' }),
    __metadata("design:type", String)
], StudentDto.prototype, "admissionMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'grado de educacion de la madre' }),
    __metadata("design:type", String)
], StudentDto.prototype, "motherEducation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'grado de educacion del padre' }),
    __metadata("design:type", String)
], StudentDto.prototype, "fatherEducation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ocupacion de la madre' }),
    __metadata("design:type", String)
], StudentDto.prototype, "motherOccupation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ocupacion del padre' }),
    __metadata("design:type", String)
], StudentDto.prototype, "fatherOccupation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sector de trabajo de la madre' }),
    __metadata("design:type", String)
], StudentDto.prototype, "motherWorkSector", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sector de trabajo del padre' }),
    __metadata("design:type", String)
], StudentDto.prototype, "fatherWorkSector", void 0);
//# sourceMappingURL=student.dto.js.map