import { Test, TestingModule } from '@nestjs/testing';  
import { StudentsService } from 'src/Infrastrutcure/students.service'; 
import { getRepositoryToken } from '@nestjs/typeorm';  
import { Student } from 'src/Domain/entities/student.entity';  
import { StudentData } from 'src/Application/students/dto/studentsFilter.dto'; 
import { Repository } from 'typeorm';  
  
describe('Students Validation Tests', () => {  
  let studentsService: StudentsService;  
  let studentRepository: Repository<Student>;  
  
  const mockStudents = [  
    {  
      ciStudent: '12345678901',  
      firstName: 'Juan',  
      lastName: 'Pérez',  
      nationality: 'Cubana',  
      address: 'Calle 23 #123',  
      province: 'La Habana',  
      municipality: 'Plaza',  
      skinColor: 'Mestizo',  
      gender: 'M'  
    },  
    {  
      ciStudent: '98765432109',  
      firstName: 'María',  
      lastName: 'González',  
      nationality: 'Cubana',  
      address: 'Avenida 5ta #456',  
      province: 'Santiago de Cuba',  
      municipality: 'Santiago',  
      skinColor: 'Mestiza',  
      gender: 'F'  
    }  
  ];  
  
  beforeEach(async () => {  
    const module: TestingModule = await Test.createTestingModule({  
      providers: [  
        StudentsService,  
        {  
          provide: getRepositoryToken(Student),  
          useValue: {  
            findOne: jest.fn(),  
            find: jest.fn(),  
            // ... otros métodos que necesites mockear  
          },  
        },  
        {  
          provide: 'FUC_StudentFucRepository',  
          useValue: {  
            findOne: jest.fn(),  
            find: jest.fn().mockResolvedValue(mockStudents),  
            // ... otros métodos que necesites mockear  
          },  
        },  
      ],  
    }).compile();  
  
    studentsService = module.get<StudentsService>(StudentsService);  
    studentRepository = module.get<Repository<Student>>(getRepositoryToken(Student));  
  });  
  
  describe('FilterStudentsInFuc', () => {  
    it('should return null when all student data matches FUC data', async () => {  
      // Datos que coinciden exactamente con los mockStudents  
      const studentData: StudentData[] = [  
        {  
          ciStudent: '12345678901',  
          firstName: 'Juan',  
          lastName: 'Pérez',  
          nationality: 'Cubana',  
          address: 'Calle 23 #123',  
          province: 'La Habana',  
          municipality: 'Plaza',  
          skinColor: 'Mestizo',  
          gender: 'M',  
          preUniversity: 'IPVCE',  
          admissionMethod: 'Examen',  
          motherEducation: 'Universitaria',  
          fatherEducation: 'Universitaria',  
          motherOccupation: 'Médico',  
          fatherOccupation: 'Ingeniero',  
          motherWorkSector: 'Salud',  
          fatherWorkSector: 'Construcción',  
          academicIndex: '95.5',  
          origin: 'Urbano',  
          situation: 'Regular'  
        }  
      ];  
  
      const result = await studentsService.FilterStudentsInFuc(studentData);  
      expect(result).toBeNull();  
    });  
  
    it('should return students with errors when data does not match FUC', async () => {  
      // Datos con discrepancias  
      const studentData: StudentData[] = [  
        {  
          ciStudent: '12345678901',  
          firstName: 'Juan Carlos', // Nombre diferente  
          lastName: 'Pérez',  
          nationality: 'Cubana',  
          address: 'Calle 23 #123',  
          province: 'La Habana',  
          municipality: 'Playa', // Municipio diferente  
          skinColor: 'Mestizo',  
          gender: 'M',  
          preUniversity: 'IPVCE',  
          admissionMethod: 'Examen',  
          motherEducation: 'Universitaria',  
          fatherEducation: 'Universitaria',  
          motherOccupation: 'Médico',  
          fatherOccupation: 'Ingeniero',  
          motherWorkSector: 'Salud',  
          fatherWorkSector: 'Construcción',  
          academicIndex: '95.5',  
          origin: 'Urbano',  
          situation: 'Regular'  
        }  
      ];  
  
      const result = await studentsService.FilterStudentsInFuc(studentData);  
      
      // Add null check before accessing properties
      expect(result).not.toBeNull();
      
      // Use non-null assertion operator (!) to tell TypeScript that result is not null
      expect(result!.length).toBe(1);  
      expect(result![0].ciStudent).toBe('12345678901');  
      expect(result![0].files).toContain('firstName'); // Corregido de 'firstNanme'
      expect(result![0].files).toContain('municipality');  
    });  
  
    it('should throw exception when student is not found in FUC', async () => {  
      // Estudiante que no existe en el sistema FUC  
      const studentData: StudentData[] = [  
        {  
          ciStudent: '11111111111', // CI que no existe en mockStudents  
          firstName: 'Pedro',  
          lastName: 'Rodríguez',  
          nationality: 'Cubana',  
          address: 'Calle 10 #789',  
          province: 'Matanzas',  
          municipality: 'Cárdenas',  
          skinColor: 'Blanco',  
          gender: 'M',  
          preUniversity: 'IPVCE',  
          admissionMethod: 'Examen',  
          motherEducation: 'Secundaria',  
          fatherEducation: 'Técnico',  
          motherOccupation: 'Profesora',  
          fatherOccupation: 'Técnico',  
          motherWorkSector: 'Educación',  
          fatherWorkSector: 'Industria',  
          academicIndex: '90.2',  
          origin: 'Rural',  
          situation: 'Regular'  
        }  
      ];  
  
      await expect(studentsService.FilterStudentsInFuc(studentData)).rejects.toThrow();  
    });  
  
    it('should validate case insensitive comparisons', async () => {  
      // Datos con diferencias de mayúsculas/minúsculas (deberían coincidir)  
      const studentData: StudentData[] = [  
        {  
          ciStudent: '12345678901',  
          firstName: 'JUAN',  
          lastName: 'pérez',  
          nationality: 'cubana',  
          address: 'Calle 23 #123',  
          province: 'la habana',  
          municipality: 'PLAZA',  
          skinColor: 'mestizo',  
          gender: 'm',  
          preUniversity: 'IPVCE',  
          admissionMethod: 'Examen',  
          motherEducation: 'Universitaria',  
          fatherEducation: 'Universitaria',  
          motherOccupation: 'Médico',  
          fatherOccupation: 'Ingeniero',  
          motherWorkSector: 'Salud',  
          fatherWorkSector: 'Construcción',  
          academicIndex: '95.5',  
          origin: 'Urbano',  
          situation: 'Regular'  
        }  
      ];  
  
      const result = await studentsService.FilterStudentsInFuc(studentData);  
      expect(result).toBeNull();  
    });  
  });  
});