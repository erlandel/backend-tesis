"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const students_service_1 = require("../Infrastrutcure/students.service");
const students_controller_1 = require("../Presentation/students.controller");
const student_entity_1 = require("./entities/student.entity");
const student_entity_2 = require("./entities/FUC/student.entity");
const Excel_entity_1 = require("./entities/Excel.entity");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student, Excel_entity_1.Excel]),
            typeorm_1.TypeOrmModule.forFeature([student_entity_2.StudentFuc], 'FUC')],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
        exports: [students_service_1.StudentsService],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map