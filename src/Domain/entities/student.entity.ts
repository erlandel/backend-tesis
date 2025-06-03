import { Entity, Column, PrimaryColumn } from 'typeorm';
import { StudentDto } from '../../Application/students/dto/student.dto';
import { StudentData } from 'src/Application/students/dto/studentsFilter.dto';

@Entity('students') // Nombre exacto de la tabla en tu base de datos
export class Student {
  @PrimaryColumn({ length: 11, name: 'ci_student' })
  ciStudent: string; // Campo CI de 11 dígitos

  @Column()
  nationality: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column()
  address: string;

  @Column()
  province: string;

  @Column()
  municipality: string;

  @Column({ name: 'skin_color' , nullable: true})
  skinColor?: string;

  @Column()
  gender: string;
  @Column()
  preUniversity: string;
  @Column()
  admissionMethod: string;
  @Column()
  motherEducation: string;
  @Column()
  fatherEducation: string;
  @Column()
  motherOccupation: string;
  @Column()
  fatherOccupation: string;
  @Column()
  motherWorkSector: string;
  @Column()
  fatherWorkSector: string;
  @Column({ nullable: true })
  academicIndex?: string;
  @Column({ nullable: true })
  origin?: string;
  @Column({ nullable: true })
  situation?: string;  

  async UpdateStudent(studentData: StudentData) { 
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
  
}