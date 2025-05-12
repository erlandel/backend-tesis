import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './Domain/students.module';
import { dataSource } from './Infrastrutcure/database/datasource';
import { StudentsController } from './Presentation/students.controller';
import { dataSourceFUC } from './Infrastrutcure/database/datasourceFuc';


@Module({
  imports: [
    // Conexión a la base de datos FUC (conexión principal/default)
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forRoot({...dataSourceFUC.options , name: 'FUC'}),
    // Conexión a la base de datos SIGIES (segunda conexión)
    
    StudentsModule,
  ],
  controllers: [StudentsController],
  providers: [],
})
export class AppModule { }
