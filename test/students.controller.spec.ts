import { Test, TestingModule } from '@nestjs/testing';  
import { StudentsController } from '../src/Presentation/students.controller';  
import { StudentsService } from '../src/Infrastrutcure/students.service';  
import { StudentDto } from 'src/Application/students/dto/student.dto'; 
import { Response } from 'express';  
import { StudentData } from '../src/Application/students/dto/studentsFilter.dto';
  
describe('StudentsController', () => {  
  let controller: StudentsController;  
  let service: StudentsService;  
  
  const mockStudentsService = {  
    createStudent: jest.fn(),  
    findAllStudents: jest.fn(),  
    findByCiStudent: jest.fn(),  
    findByCiFuc: jest.fn(),  
    FilterStudentsInFuc: jest.fn(),  
    updateStudent: jest.fn(),  
    removeStudent: jest.fn(),  
    AddStudentsByExcel: jest.fn()  
  };  
  
  beforeEach(async () => {  
    const module: TestingModule = await Test.createTestingModule({  
      controllers: [StudentsController],  
      providers: [  
        {  
          provide: StudentsService,  
          useValue: mockStudentsService,  
        },  
      ],  
    }).compile();  
  
    controller = module.get<StudentsController>(StudentsController);  
    service = module.get<StudentsService>(StudentsService);  
  });  
  
  it('should be defined', () => {  
    expect(controller).toBeDefined();  
  });  
  
  describe('createStudent', () => {  
    it('should create a student successfully', async () => {  
      const studentDto = { ciStudent: '12345678901' } as StudentDto;  
      mockStudentsService.createStudent.mockResolvedValue({});  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      // Create a mock File object instead of null
      const mockFile = {
        fieldname: 'file',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 4
      } as Express.Multer.File;

      await controller.createStudent(studentDto, mockFile, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(200);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'Estudiante creado con éxito',  
      });  
    });  
  
    it('should return error if student already exists', async () => {  
      const studentDto = { ciStudent: '12345678901' } as StudentDto;  
      mockStudentsService.createStudent.mockResolvedValue(null);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      // Create a mock File object instead of null
      const mockFile = {
        fieldname: 'file',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 4
      } as Express.Multer.File;

      await controller.createStudent(studentDto, mockFile, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(400);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: `El estudiante con carnet de identidad ${studentDto.ciStudent} ya existe`,  
      });  
    });  
  });  
  
  describe('findByCiFUC', () => {  
    it('should return student from FUC', async () => {  
      const mockStudent = { ciStudent: '12345678901', name: 'Test Student' };  
      mockStudentsService.findByCiFuc.mockResolvedValue(mockStudent);  
        
      const result = await controller.findByCiFUC('12345678901');  
        
      expect(result).toEqual(mockStudent);  
      expect(mockStudentsService.findByCiFuc).toHaveBeenCalledWith('12345678901');  
    });  
  });  
  
  describe('FilterStudentsInFuc', () => {  
    it('should return success when all students match FUC data', async () => {  
      // Create a complete StudentData object with all required properties
      const studentData: StudentData[] = [{
        ciStudent: '12345678901',
        nationality: 'Cuban',
        lastName: 'Doe',
        firstName: 'John',
        address: 'Test Address',
        province: 'Havana',
        municipality: 'Plaza',
        gender: 'M',
        preUniversity: 'Test Pre',
        admissionMethod: 'Test Method',
        motherEducation: 'University',
        fatherEducation: 'University',
        motherOccupation: 'Engineer',
        fatherOccupation: 'Doctor',
        motherWorkSector: 'Public',
        fatherWorkSector: 'Public',
        skinColor: 'White',
        academicIndex: '95',
        origin: 'Urban',
        situation: 'Regular'
      }];
      
      mockStudentsService.FilterStudentsInFuc.mockResolvedValue(null);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.FilterStudentsInFuc(studentData, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(200);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'Todos los datos de los estudiantes coinciden con los de la FUC'  
      });  
    });  
  
    it('should return error when students do not match FUC data', async () => {  
      // Create a complete StudentData object with all required properties
      const studentData: StudentData[] = [{
        ciStudent: '12345678901',
        nationality: 'Cuban',
        lastName: 'Doe',
        firstName: 'John',
        address: 'Test Address',
        province: 'Havana',
        municipality: 'Plaza',
        gender: 'M',
        preUniversity: 'Test Pre',
        admissionMethod: 'Test Method',
        motherEducation: 'University',
        fatherEducation: 'University',
        motherOccupation: 'Engineer',
        fatherOccupation: 'Doctor',
        motherWorkSector: 'Public',
        fatherWorkSector: 'Public',
        skinColor: 'White',
        academicIndex: '95',
        origin: 'Urban',
        situation: 'Regular'
      }];
      
      const nonMatchingStudents = [{ ciStudent: '12345678901', error: 'Datos no coinciden' }];  
      mockStudentsService.FilterStudentsInFuc.mockResolvedValue(nonMatchingStudents);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.FilterStudentsInFuc(studentData, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(400);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'Los siguientes estudiantes no coinciden con los de la FUC',  
        students: nonMatchingStudents  
      });  
    });  
  });  
});