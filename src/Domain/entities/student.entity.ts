import { Entity, Column, PrimaryColumn } from 'typeorm';

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

  @Column({ name: 'skin_color' })
  skinColor: string;

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
}