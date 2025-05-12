import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from '../Infrastrutcure/students.service'; // Ajusta la ruta si es necesario
import { StudentsController } from '../Presentation/students.controller'; // Ajusta la ruta si es necesario
import { Student } from './entities/student.entity';
import { StudentFuc } from 'src/Domain/entities/FUC/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student]),
  TypeOrmModule.forFeature([StudentFuc], 'FUC')],
  controllers: [StudentsController], // Asegúrate de que el controlador esté aquí
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule { }