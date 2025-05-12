import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../Domain/entities/student.entity';
import { StudentDto } from 'src/Application/students/dto/student.dto'; 
import { UpdateStudentDto } from 'src/Application/students/dto/update-student.dto'; 
import { StudentFuc } from 'src/Domain/entities/FUC/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(StudentFuc, 'FUC')
    private studentDto: Repository<StudentFuc>,
  ) { }

  async createStudent(studentDto: StudentDto): Promise<Student | null> {
    const est = await this.studentsRepository.findOne({where: {ciStudent : studentDto.ciStudent}});
    if (est != null) {
      return null;
    }
      const student = this.studentsRepository.create(studentDto);
    await this.studentsRepository.save(student);
    return student;
   
  }

  async findAllStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }
  async findByCiStudent(ciStudent: string): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ ciStudent });
    if (!student) {
      throw new NotFoundException(`Estudiante con CI ${ciStudent} no encontrado.`);
    }
    return student;
  }
  async findByCiFuc(ciStudent: string): Promise<StudentFuc> {
    const student = await this.studentDto.findOneBy({ ciStudent });
    if (!student) {
      throw new NotFoundException(`Estudiante con CI ${ciStudent} no encontrado.`);
    }
    return student;
  }
  async updateStudent(ciStudent: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    // Carga la entidad existente y luego aplica los cambios
    // El método preload busca una entidad por su ID, si la encuentra,
    // la fusiona con los nuevos datos y la devuelve (sin guardar).
    // Si no la encuentra, devuelve undefined.
    const student = await this.studentsRepository.preload({
      ciStudent: ciStudent,
      ...updateStudentDto,
    });

    if (!student) {
      throw new NotFoundException(`Estudiante con CI ${ciStudent} no encontrado para actualizar.`);
    }

    try {
      return await this.studentsRepository.save(student);
    } catch (error) {
      console.error('Error updating student:', error);
      throw new InternalServerErrorException('Error al actualizar el estudiante.');
    }
  }

  async removeStudent(ciStudent: string): Promise<void> {
    const result = await this.studentsRepository.delete(ciStudent);
    if (result.affected === 0) {
      throw new NotFoundException(`Estudiante con CI ${ciStudent} no encontrado para eliminar.`);
    }
    // No es necesario devolver nada si la eliminación fue exitosa
  }
}