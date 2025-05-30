"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const student_dto_1 = require("./student.dto");
class UpdateStudentDto extends (0, swagger_1.PartialType)(student_dto_1.StudentDto) {
}
exports.UpdateStudentDto = UpdateStudentDto;
//# sourceMappingURL=update-student.dto.js.map