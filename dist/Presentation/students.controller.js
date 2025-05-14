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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("../Infrastrutcure/students.service");
const student_dto_1 = require("../Application/students/dto/student.dto");
const update_student_dto_1 = require("../Application/students/dto/update-student.dto");
const swagger_1 = require("@nestjs/swagger");
const student_entity_1 = require("../Domain/entities/student.entity");
let StudentsController = class StudentsController {
    studentsService;
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async createStudent(studentDto, res) {
        const student = await this.studentsService.createStudent(studentDto);
        if (student !== null) {
            res.status(200).json({
                message: 'Estudiante creado con éxito',
            });
        }
        else {
            res.status(400).json({
                message: `El estudiante con carnet de identidad ${studentDto.ciStudent} ya existe`,
            });
        }
    }
    async findAllStudents() {
        return this.studentsService.findAllStudents();
    }
    async findByCiStudent(ciStudent) {
        return this.studentsService.findByCiStudent(ciStudent);
    }
    async updateStudent(ciStudent, updateStudentDto) {
        return this.studentsService.updateStudent(ciStudent, updateStudentDto);
    }
    async removeStudent(ciStudent) {
        return this.studentsService.removeStudent(ciStudent);
    }
    async findByCiFUC(ciStudent) {
        return this.studentsService.findByCiFuc(ciStudent);
    }
    async FilterStudentsInFuc(studentFilterDto, res) {
        try {
            const students = await this.studentsService.FilterStudentsInFuc(studentFilterDto);
            if (students === null) {
                res.status(200).json({
                    message: 'Todos los datos de los estudiantes coinciden con los de la FUC'
                });
            }
            else {
                res.status(400).json({
                    message: 'Los siguientes estudiantes no coinciden con los de la FUC',
                    students: students
                });
            }
        }
        catch (error) {
            res.status(404).json({
                error: error.message,
            });
        }
    }
    async AddStudentsByExcel(studentDto) {
        return this.studentsService.AddStudentsByExcel(studentDto);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo estudiante' }),
    (0, swagger_1.ApiBody)({ type: student_dto_1.StudentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'El estudiante ha sido creado exitosamente.', type: student_entity_1.Student }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.StudentDto, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los estudiantes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todos los estudiantes.', type: [student_entity_1.Student] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAllStudents", null);
__decorate([
    (0, common_1.Get)(':ciStudent'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un estudiante por su CI' }),
    (0, swagger_1.ApiParam)({ name: 'ciStudent', description: 'Número de CI del estudiante (11 dígitos)', example: '12345678901' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estudiante encontrado.', type: student_entity_1.Student }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    __param(0, (0, common_1.Param)('ciStudent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findByCiStudent", null);
__decorate([
    (0, common_1.Put)(':ciStudent'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un estudiante por su CI' }),
    (0, swagger_1.ApiParam)({ name: 'ciStudent', description: 'Número de CI del estudiante a actualizar', example: '12345678901' }),
    (0, swagger_1.ApiBody)({ type: update_student_dto_1.UpdateStudentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'El estudiante ha sido actualizado exitosamente.', type: student_entity_1.Student }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    __param(0, (0, common_1.Param)('ciStudent')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)(':ciStudent'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un estudiante por su CI' }),
    (0, swagger_1.ApiParam)({ name: 'ciStudent', description: 'Número de CI del estudiante a eliminar', example: '12345678901' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'El estudiante ha sido eliminado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('ciStudent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "removeStudent", null);
__decorate([
    (0, common_1.Get)('FUC/:ciStudent'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un estudiante por su CI desde la FUC' }),
    (0, swagger_1.ApiParam)({ name: 'ciStudent', description: 'Número de CI del estudiante (11 dígitos)', example: '12345678901' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estudiante encontrado.', type: student_entity_1.Student }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    __param(0, (0, common_1.Param)('ciStudent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findByCiFUC", null);
__decorate([
    (0, common_1.Post)('FilterwithFuc/'),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar si los datos de un estudiante coinciden con los de la FUC' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "FilterStudentsInFuc", null);
__decorate([
    (0, common_1.Post)('AddStudentsbyExcel/'),
    (0, swagger_1.ApiOperation)({ summary: 'Añadir estudiantes a la base de datos en funcion del excel' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "AddStudentsByExcel", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('students'),
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map