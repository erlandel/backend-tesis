import { Test, TestingModule } from '@nestjs/testing';  
import { StudentsController } from 'src/Presentation/students.controller';   
import { StudentsService } from 'src/Infrastrutcure/students.service';   
import { StudentData } from 'src/Application/students/dto/studentsFilter.dto'; 
import { Response } from 'express';  
  
describe('StudentsController Validation Tests', () => {  
  let controller: StudentsController;  
  let service: StudentsService;  
  
  beforeEach(async () => {  
    const module: TestingModule = await Test.createTestingModule({  
      controllers: [StudentsController],  
      providers: [  
        {  
          provide: StudentsService,  
          useValue: {  
            FilterStudentsInFuc: jest.fn(),  
            findByCiFuc: jest.fn(),  
          },  
        },  
      ],  
    }).compile();  
  
    controller = module.get<StudentsController>(StudentsController);  
    service = module.get<StudentsService>(StudentsService);  
  });  
  
  describe('FilterStudentsInFuc', () => {  
    it('should return success message when all students match FUC data', async () => {  
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
  
      jest.spyOn(service, 'FilterStudentsInFuc').mockResolvedValue(null);  
  
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.FilterStudentsInFuc(studentData, mockResponse);  
  
      expect(service.FilterStudentsInFuc).toHaveBeenCalledWith(studentData);  
      expect(mockResponse.status).toHaveBeenCalledWith(200);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'Todos los datos de los estudiantes coinciden con los de la FUC'  
      });  
    });  
  
    it('should return error message with mismatched students', async () => {  
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
  
      const mismatchedStudents = [  
        {  
          ciStudent: '12345678901',  
          files: ['firstName', 'lastName']  
        }  
      ];  
  
      jest.spyOn(service, 'FilterStudentsInFuc').mockResolvedValue(mismatchedStudents);  
  
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.FilterStudentsInFuc(studentData, mockResponse);  
  
      expect(service.FilterStudentsInFuc).toHaveBeenCalledWith(studentData);  
      expect(mockResponse.status).toHaveBeenCalledWith(400);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'Los siguientes estudiantes no coinciden con los de la FUC',  
        students: mismatchedStudents  
      });  
    });  
  
    it('should handle exceptions properly', async () => {  
      const studentData: StudentData[] = [  
        {  
          ciStudent: '12345678901',  
          // ... campos incompletos  
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
  
      const errorMessage = 'Estudiante con CI 12345678901 no encontrado en la FUC.';  
      jest.spyOn(service, 'FilterStudentsInFuc').mockRejectedValue(new Error(errorMessage));  
  
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.FilterStudentsInFuc(studentData, mockResponse);  
  
      expect(service.FilterStudentsInFuc).toHaveBeenCalledWith(studentData);  
      expect(mockResponse.status).toHaveBeenCalledWith(404);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        error: errorMessage,  
      });  
    });  
  });  
  
  describe('findByCiFUC', () => {  
    it('should return student data from FUC', async () => {  
      const mockStudent = {  
        ciStudent: '12345678901',  
        firstName: 'Juan',  
        lastName: 'Pérez',  
        nationality: 'Cubana',
        // Add the missing properties required by StudentFuc interface
        province: 'La Habana',
        gender: 'M',
        address: 'Calle 23 #123',
        municipality: 'Plaza',
        skinColor: 'Mestizo'
      };  
  
      jest.spyOn(service, 'findByCiFuc').mockResolvedValue(mockStudent);  
  
      const result = await controller.findByCiFUC('12345678901');  
  
      expect(service.findByCiFuc).toHaveBeenCalledWith('12345678901');  
      expect(result).toEqual(mockStudent);  
    });  
  });  
});