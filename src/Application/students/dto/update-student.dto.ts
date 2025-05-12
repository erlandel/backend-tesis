// Cambia esta importación
import { PartialType } from '@nestjs/swagger';
import { StudentDto } from './student.dto';

export class UpdateStudentDto extends PartialType(StudentDto) {}