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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../Domain/entities/student.entity");
const student_entity_2 = require("../Domain/entities/FUC/student.entity");
let StudentsService = class StudentsService {
    studentsRepository;
    studentDto;
    constructor(studentsRepository, studentDto) {
        this.studentsRepository = studentsRepository;
        this.studentDto = studentDto;
    }
    async createStudent(studentDto) {
        const est = await this.studentsRepository.findOne({ where: { ciStudent: studentDto.ciStudent } });
        if (est != null) {
            return null;
        }
        const student = this.studentsRepository.create(studentDto);
        await this.studentsRepository.save(student);
        return student;
    }
    async findAllStudents() {
        return this.studentsRepository.find();
    }
    async findByCiStudent(ciStudent) {
        const student = await this.studentsRepository.findOneBy({ ciStudent });
        if (!student) {
            throw new common_1.NotFoundException(`Estudiante con CI ${ciStudent} no encontrado.`);
        }
        return student;
    }
    async findByCiFuc(ciStudent) {
        const student = await this.studentDto.findOneBy({ ciStudent });
        if (!student) {
            throw new common_1.NotFoundException(`Estudiante con CI ${ciStudent} no encontrado.`);
        }
        return student;
    }
    async updateStudent(ciStudent, updateStudentDto) {
        const student = await this.studentsRepository.preload({
            ciStudent: ciStudent,
            ...updateStudentDto,
        });
        if (!student) {
            throw new common_1.NotFoundException(`Estudiante con CI ${ciStudent} no encontrado para actualizar.`);
        }
        try {
            return await this.studentsRepository.save(student);
        }
        catch (error) {
            console.error('Error updating student:', error);
            throw new common_1.InternalServerErrorException('Error al actualizar el estudiante.');
        }
    }
    async removeStudent(ciStudent) {
        const result = await this.studentsRepository.delete(ciStudent);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Estudiante con CI ${ciStudent} no encontrado para eliminar.`);
        }
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_2.StudentFuc, 'FUC')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map