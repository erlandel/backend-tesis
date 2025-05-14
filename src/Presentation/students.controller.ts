import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put, // O Put
  NotFoundException,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { StudentsService } from '../Infrastrutcure/students.service'; // Ajusta la ruta si es necesario
import { StudentDto } from 'src/Application/students/dto/student.dto'; 
import { UpdateStudentDto } from 'src/Application/students/dto/update-student.dto'; 
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Student } from '../Domain/entities/student.entity'; // Importa la entidad para el tipo de respuesta
import { StudentFuc } from 'src/Domain/entities/FUC/student.entity';
import { Response } from 'express';
import { StudentData } from 'src/Application/students/dto/studentsFilter.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estudiante' })
  @ApiBody({ type: StudentDto })
  @ApiResponse({ status: 201, description: 'El estudiante ha sido creado exitosamente.', type: Student })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createStudent(@Body() studentDto: StudentDto , @Res () res: Response){
   const student = await this.studentsService.createStudent(studentDto);
    if (student !== null) {
      res.status(200).json({
        message: 'Estudiante creado con éxito',
      });
    }
    else {
      res.status(400).json({
        message: `El estudiante con carnet de identidad ${studentDto.ciStudent} ya existe`,
      })
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de todos los estudiantes.', type: [Student] })
  async findAllStudents(): Promise<Student[]> {
    return this.studentsService.findAllStudents();
  }

  @Get(':ciStudent')
  @ApiOperation({ summary: 'Obtener un estudiante por su CI' })
  @ApiParam({ name: 'ciStudent', description: 'Número de CI del estudiante (11 dígitos)', example: '12345678901' })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado.', type: Student })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  async findByCiStudent(@Param('ciStudent') ciStudent: string): Promise<Student> {
    return this.studentsService.findByCiStudent(ciStudent);
  }

  @Put(':ciStudent') // Cambiado de Patch a Put para reemplazar completamente el recurso
  @ApiOperation({ summary: 'Actualizar un estudiante por su CI' })
  @ApiParam({ name: 'ciStudent', description: 'Número de CI del estudiante a actualizar', example: '12345678901' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'El estudiante ha sido actualizado exitosamente.', type: Student })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  async updateStudent(
    @Param('ciStudent') ciStudent: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentsService.updateStudent(ciStudent, updateStudentDto);
  }

  @Delete(':ciStudent')
  @ApiOperation({ summary: 'Eliminar un estudiante por su CI' })
  @ApiParam({ name: 'ciStudent', description: 'Número de CI del estudiante a eliminar', example: '12345678901' })
  @ApiResponse({ status: 204, description: 'El estudiante ha sido eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve 204 No Content en caso de éxito
  async removeStudent(@Param('ciStudent') ciStudent: string): Promise<void> {
    return this.studentsService.removeStudent(ciStudent);
  }
  @Get('FUC/:ciStudent')
  @ApiOperation({ summary: 'Obtener un estudiante por su CI desde la FUC' })
  @ApiParam({ name: 'ciStudent', description: 'Número de CI del estudiante (11 dígitos)', example: '12345678901' })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado.', type: Student })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  async findByCiFUC(@Param('ciStudent') ciStudent: string): Promise<StudentFuc> {
    return this.studentsService.findByCiFuc(ciStudent);
  }
  @Post('FilterwithFuc/')
  @ApiOperation({ summary: 'Verificar si los datos de un estudiante coinciden con los de la FUC' })
  async FilterStudentsInFuc(@Body() studentFilterDto: StudentData[], @Res() res: Response) {
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
        })
      }
    } catch (error) {
      res.status(404).json({
        error: error.message,
      })
    }
  }
  @Post('AddStudentsbyExcel/')
  @ApiOperation({ summary: 'Añadir estudiantes a la base de datos en funcion del excel' })
  async AddStudentsByExcel(@Body() studentDto: StudentData[]) { 
    return this.studentsService.AddStudentsByExcel(studentDto);
  }
}