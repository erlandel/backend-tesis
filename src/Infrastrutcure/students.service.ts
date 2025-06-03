import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../Domain/entities/student.entity';
import { StudentDto } from 'src/Application/students/dto/student.dto';
import { UpdateStudentDto } from 'src/Application/students/dto/update-student.dto';
import { StudentFuc } from 'src/Domain/entities/FUC/student.entity';
import { StudentData } from 'src/Application/students/dto/studentsFilter.dto';
import { StudentWithErrors } from 'src/Application/students/dto/studentWithErrors.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(StudentFuc, 'FUC')
    private studentDto: Repository<StudentFuc>
  ) { }

  async createStudent(studentDto: StudentDto): Promise<Student | null> {
    const est = await this.studentsRepository.findOne({ where: { ciStudent: studentDto.ciStudent } });
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
    const student = await this.studentDto.findOneBy({ identidad_numero: ciStudent });
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
  async FilterStudentsInFuc(studentFilterDto: StudentData[]): Promise<StudentWithErrors[] | null> {
    const response: StudentWithErrors[] = [];
    const people = await this.studentDto.find();
    if (people.length === null) {
      throw new NotFoundException(`Estudiantes no encontrados.`);
    }
    for (const person of studentFilterDto) {
      const student = people.find(p => p.identidad_numero === person.identidad_numero);
      if (!student) {
        throw new NotFoundException(`Estudiante con CI ${person.identidad_numero} no encontrado en la FUC.`);
      }
      const students: StudentWithErrors = {
        ciStudent: student.identidad_numero,
        files: [],
      };
      if (student.ciudadania.toLowerCase() !== person.ciudadania.toLowerCase()) {
        students.files.push('ciudadania');
      }

      if (student.primer_apellido.toLowerCase() !== person.primer_apellido.toLowerCase()) {
        students.files.push('primer_apellido');
      }
      if (student.segundo_apellido.toLowerCase() !== person.segundo_apellido.toLowerCase()) {
        students.files.push('segundo_apellido');
      }
      if (student.primer_nombre.toLowerCase() !== person.primer_nombre.toLowerCase()) {
        students.files.push('primer_nombre');
      }
      if (person.segundo_nombre === null || student.segundo_nombre.toLowerCase() !== person.segundo_nombre.toLowerCase()) {
        students.files.push('segundo_nombre');
      }
      if (student.direccion.toLowerCase() !== person.direccion.toLowerCase()) {
        students.files.push('address');
      }
      if (student.provincia_residencia.toLowerCase() !== person.provincia_residencia.toLowerCase()) {
        students.files.push('province');
      }
      if (student.municipio_residencia.toLowerCase() !== person.municipio_residencia.toLowerCase()) {
        students.files.push('municipality');
      }
      if (student.color_piel.toLowerCase() !== person.color_piel?.toLowerCase()) {
        students.files.push('skinColor');
      }
      if (student.sexo.toLowerCase() !== person.sexo.toLowerCase()) {
        students.files.push('gender');
      }
      if (students.files.length > 0) {
        response.push(students);
      }
    }
    if (response.length === 0) {
      return null;
    }
    return response;
  }
  async AddStudentsByExcel(studentDto: StudentData[]) {
    const studentsRegistered = await this.studentsRepository.find();
    const toSave: Student[] = [];
    for (const i of studentDto) {
      let students = studentsRegistered.find(p => p.ciStudent === i.identidad_numero);
      if (students) {
        students.UpdateStudent(i);
      }
      else {
        students = this.studentsRepository.create({
          ciStudent: i.identidad_numero,
          nationality: i.ciudadania,
          lastName: i.primer_apellido,
          firstName: i.primer_nombre,
      
          address: i.direccion,
          province: i.provincia_residencia,
          municipality: i.municipio_residencia,
          skinColor: i.color_piel,
          gender: i.sexo,
          preUniversity: i.preUniversity,
          admissionMethod: i.admissionMethod,
          motherEducation: i.motherEducation,
          fatherEducation: i.fatherEducation,
          motherOccupation: i.motherOccupation,
          fatherOccupation: i.fatherOccupation,
          motherWorkSector: i.motherWorkSector,
          fatherWorkSector: i.fatherWorkSector,
          academicIndex: i.academicIndex,
          origin: i.origin,
          situation: i.situation,
        });
      }
      toSave.push(students);
    }
    await this.studentsRepository.save(toSave);
  }

}