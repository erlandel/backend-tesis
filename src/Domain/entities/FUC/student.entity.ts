import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('studentFuc')
export class StudentFuc {
  @ApiProperty({ description: 'Apellido del estudiante' })
  @Column()
  lastName: string;
  @Column()
  @ApiProperty({ description: 'Nombre del estudiante' })
  firstName: string;
  @ApiProperty({ description: 'carnet de identidad' })
  @PrimaryColumn({ length: 11, name: 'ci_student' })
  ciStudent: string;   // Cambiado de idCard a ciStudent para coincidir con la entidad
  @Column()
  @ApiProperty({ description: 'Provincia' })
  province: string;
  @Column()
  @ApiProperty({ description: 'Género' })
  gender: string;
  @Column()
  @ApiProperty({ description: 'Nacionalidad' })
  nationality: string;
  @Column()
  @ApiProperty({ description: 'Dirección' })
  address: string;
  @Column()
  @ApiProperty({ description: 'Municipio' })
  municipality: string;
  @Column()
  @ApiProperty({ description: 'Color de piel' })
  skinColor: string;
}