import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Student } from 'src/Domain/entities/student.entity';
import { Excel } from 'src/Domain/entities/Excel.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Usar path.resolve para asegurar que la ruta sea correcta independientemente de dónde se ejecute
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

describe('Database Integration Tests', () => {
  let app: INestApplication;
  let studentRepository: Repository<Student>;
  let excelRepository: Repository<Excel>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME,
          password: String(process.env.DB_PASSWORD), // Convertir explícitamente a string
          database: process.env.DB_NAME,
          entities: [Student, Excel],
          synchronize: true, // ⚠️ solo para tests; ideal usar migraciones
          // Añadir opciones para mejorar la estabilidad de la conexión
          logging: false,
          retryAttempts: 5,
          retryDelay: 3000,
        }),
        TypeOrmModule.forFeature([Student, Excel]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Añadir ValidationPipe para validar DTOs automáticamente
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();

    studentRepository = moduleFixture.get<Repository<Student>>(getRepositoryToken(Student));
    excelRepository = moduleFixture.get<Repository<Excel>>(getRepositoryToken(Excel));
  }, 30000); // Timeout extendido para conexión y sincronización

  beforeEach(async () => {
    // Usar try/catch para manejar posibles errores al limpiar las tablas
    try {
      await studentRepository.clear();
      await excelRepository.clear();
    } catch (error) {
      console.error('Error al limpiar las tablas:', error);
    }
  });

  it('should create and retrieve a student from the database', async () => {
    // Crear un objeto de estudiante completo con todos los campos obligatorios
    const student = studentRepository.create({
      ciStudent: '12345678901',
      firstName: 'Test',
      lastName: 'Student',
      nationality: 'Cuban',
      gender: 'M',
      address: 'Test Address',
      province: 'Test Province',
      municipality: 'Test Municipality',
      skinColor: 'Test SkinColor',
      preUniversity: 'Test PreUniversity',
      admissionMethod: 'Test AdmissionMethod',
      motherEducation: 'Test MotherEducation',
      fatherEducation: 'Test FatherEducation',
      motherOccupation: 'Test MotherOccupation',
      fatherOccupation: 'Test FatherOccupation',
      motherWorkSector: 'Test MotherWorkSector',
      fatherWorkSector: 'Test FatherWorkSector',
      academicIndex: '90.5',
      origin: 'Test Origin',
      situation: 'Test Situation'
    });

    // Guardar el estudiante y manejar posibles errores
    try {
      await studentRepository.save(student);
    } catch (error) {
      console.error('Error al guardar el estudiante:', error);
      throw error; // Re-lanzar el error para que la prueba falle
    }

    // Buscar el estudiante guardado
    const foundStudent = await studentRepository.findOne({
      where: { ciStudent: '12345678901' },
    });

    expect(foundStudent).toBeDefined();
    expect(foundStudent?.firstName).toBe('Test');
    expect(foundStudent?.lastName).toBe('Student');
    expect(foundStudent?.nationality).toBe('Cuban');
    // Añadir más aserciones para verificar que todos los campos se guardaron correctamente
  });

  it('should create and retrieve an Excel file from the database', async () => {
    const excel = excelRepository.create({
      name: 'Test Excel',
      modelType: 'tipo1',
      description: 'Test Description',
      route: '/path/to/file.xlsx',
    });

    const savedExcel = await excelRepository.save(excel);

    const foundExcel = await excelRepository.findOne({ where: { id: savedExcel.id } });

    expect(foundExcel).toBeDefined();
    expect(foundExcel?.name).toBe('Test Excel');
  });

  afterAll(async () => {
    if (app) {
      try {
        await app.close();
      } catch (error) {
        console.error('Error al cerrar la aplicación:', error);
      }
    }
  });
});
