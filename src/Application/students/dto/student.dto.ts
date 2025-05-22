import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StudentDto {
  @ApiProperty({ description: 'Apellido del estudiante' })
  lastName: string;

  @ApiProperty({ description: 'Nombre del estudiante' })
  firstName: string;

  @ApiProperty({ description: 'Número de carnet de identidad (11 dígitos)' })
  ciStudent: string;  // Cambiado de idCard a ciStudent para coincidir con la entidad

  @ApiProperty({ description: 'Provincia' })
  province: string;

  @ApiProperty({ description: 'Género' })
  gender: string;

  @ApiProperty({ description: 'Nacionalidad' })
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({ description: 'Dirección' })
  address: string;

  @ApiProperty({ description: 'Municipio' })
  municipality: string;

  @ApiProperty({ description: 'Color de piel' })
  skinColor: string;
  @ApiProperty({ description: 'nombre del preuniversitario' })
  preUniversity: string;
  @ApiProperty({ description: 'metodo de admision' })
  admissionMethod: string;
  @ApiProperty({ description:'grado de educacion de la madre' })
  motherEducation: string;
  @ApiProperty({ description:'grado de educacion del padre' })
  fatherEducation: string;
  @ApiProperty({ description:'ocupacion de la madre' })
  motherOccupation: string;
  @ApiProperty({ description:'ocupacion del padre' })
  fatherOccupation: string;
  @ApiProperty({ description:'sector de trabajo de la madre' })
  motherWorkSector: string;
  @ApiProperty({ description:'sector de trabajo del padre' })
  fatherWorkSector: string;
}