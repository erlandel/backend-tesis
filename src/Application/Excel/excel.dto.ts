import { ApiProperty } from '@nestjs/swagger';

export class ExcelDto {
  @ApiProperty({ description: 'Nombre del archivo Excel' })
  name: string;

  @ApiProperty({ description: 'Tipo de modelo al que aplica' })
  modelType: string;

  @ApiProperty({ description: 'Descripción opcional' })
  description: string;
}