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
  async FilterStudentsInFuc(studentFilterDto: StudentData[]): Promise<StudentWithErrors [] | null>{
    const response : StudentWithErrors [] = [];
    const people = await this.studentDto.find();
    if (people.length === null) {
      throw new NotFoundException(`Estudiantes no encontrados.`);
    }
    for (const person of studentFilterDto) {
      const student = people.find(p => p.ciStudent === person.ciStudent);
      if (!student) {
        throw new NotFoundException(`Estudiante con CI ${person.ciStudent} no encontrado en la FUC.`);
      }
      const students: StudentWithErrors = {
        ciStudent: student.ciStudent,
        files: [],
      };
      if (student.nationality.toLowerCase() !== person.nationality.toLowerCase()) {
        students.files.push('nationality');
      }
      console.log(students.files);
      if (student.lastName.toLowerCase() !== person.lastName.toLowerCase()) {
        students.files.push('lastName');
      }
      if (student.firstName.toLowerCase() !== person.firstName.toLowerCase()) {
        students.files.push('firstNanme');
      }
      if (student.address.toLowerCase() !== person.address.toLowerCase()) {
        students.files.push('address');
      }
      if (student.province.toLowerCase() !== person.province.toLowerCase()) {
        students.files.push('province');
      }
      if (student.municipality.toLowerCase() !== person.municipality.toLowerCase()) {
        students.files.push('municipality');
      }
      if (student.skinColor.toLowerCase() !== person.skinColor?.toLowerCase()) {
        students.files.push('skinColor');
      }
      if (student.gender.toLowerCase() !== person.gender.toLowerCase()) {
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
      let students = studentsRegistered.find(p => p.ciStudent === i.ciStudent);
      if (students) {
        students.UpdateStudent(i);
      }
      else {
        students = this.studentsRepository.create({
          ciStudent:      i.ciStudent,
          nationality:    i.nationality,
          lastName:       i.lastName,
          firstName:      i.firstName,
          address:        i.address,
          province:       i.province,
          municipality:   i.municipality,
          skinColor:      i.skinColor,
          gender:         i.gender,
          preUniversity:  i.preUniversity,
          admissionMethod:i.admissionMethod,
          motherEducation:i.motherEducation,
          fatherEducation:i.fatherEducation,
          motherOccupation:i.motherOccupation,
          fatherOccupation:i.fatherOccupation,
          motherWorkSector:i.motherWorkSector,
          fatherWorkSector:i.fatherWorkSector,
          academicIndex:  i.academicIndex,
          origin:         i.origin,
          situation:      i.situation,
        });
      }
      toSave.push(students);
    }
    await this.studentsRepository.save(toSave);
  }
  
}