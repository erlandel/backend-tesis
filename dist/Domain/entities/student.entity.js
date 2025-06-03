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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
let Student = class Student {
    ciStudent;
    nationality;
    lastName;
    firstName;
    address;
    province;
    municipality;
    skinColor;
    gender;
    preUniversity;
    admissionMethod;
    motherEducation;
    fatherEducation;
    motherOccupation;
    fatherOccupation;
    motherWorkSector;
    fatherWorkSector;
    academicIndex;
    origin;
    situation;
    async UpdateStudent(studentData) {
        this.academicIndex = studentData.academicIndex;
        this.address = studentData.direccion;
        this.admissionMethod = studentData.admissionMethod;
        this.firstName = studentData.primer_nombre;
        this.fatherEducation = studentData.fatherEducation;
        this.fatherOccupation = studentData.fatherOccupation;
        this.fatherWorkSector = studentData.fatherWorkSector;
        this.gender = studentData.sexo;
        this.lastName = studentData.primer_apellido;
        this.motherEducation = studentData.motherEducation;
        this.motherOccupation = studentData.motherOccupation;
        this.motherWorkSector = studentData.motherWorkSector;
        this.nationality = studentData.ciudadania;
        this.origin = studentData.origin;
        this.preUniversity = studentData.preUniversity;
        this.province = studentData.provincia_residencia;
        this.skinColor = studentData.color_piel;
        this.situation = studentData.situation;
        this.municipality = studentData.municipio_residencia;
    }
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 11, name: 'ci_student' }),
    __metadata("design:type", String)
], Student.prototype, "ciStudent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "municipality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'skin_color', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "skinColor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "preUniversity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "admissionMethod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "motherEducation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "fatherEducation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "motherOccupation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "fatherOccupation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "motherWorkSector", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "fatherWorkSector", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "academicIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "situation", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('students')
], Student);
//# sourceMappingURL=student.entity.js.map