import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('studentFuc')
export class StudentFuc {
  @ApiProperty({ description: 'Apellido del estudiante' })
  @Column()
  primer_apellido: string;
  @Column()
  @ApiProperty({ description: 'Segundo apellido del estudiante' })
  segundo_apellido: string;
  @Column()
  @ApiProperty({ description: 'Nombre del estudiante' })
  primer_nombre: string;
  @Column()
  @ApiProperty({ description: 'Segundo nombre del estudiante' })
  segundo_nombre: string;
  @ApiProperty({ description: 'carnet de identidad' })
  @PrimaryColumn({ length: 11, name: 'ci_student' })
  identidad_numero: string;   // Cambiado de idCard a ciStudent para coincidir con la entidad
  @Column()
  @ApiProperty({ description: 'Provincia' })
  provincia_residencia: string;
  @Column()
  @ApiProperty({ description: 'Género' })
  sexo: string;
  @Column()
  @ApiProperty({ description: 'Nacionalidad' })
  ciudadania: string;
  @Column()
  @ApiProperty({ description: 'Dirección' })
  direccion: string;
  @Column()
  @ApiProperty({ description: 'Municipio' })
  municipio_residencia: string;
  @Column({nullable: true})
  @ApiProperty({ description: 'Color de piel'})
  color_piel: string;
}