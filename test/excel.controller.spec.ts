import { Test, TestingModule } from '@nestjs/testing';  
import { ExcelController } from 'src/Presentation/excel.controller';
import { ExcelService } from 'src/Infrastrutcure/excel.service'; 
import { ExcelDto } from 'src/Application/Excel/excel.dto';  
import { Response } from 'express';  
  
describe('ExcelController', () => {  
  let controller: ExcelController;  
  let service: ExcelService;  
  
  const mockExcelService = {  
    createExcel: jest.fn(),  
    getExcelbyId: jest.fn(),  
    getAllExcel: jest.fn()  
  };  
  
  beforeEach(async () => {  
    const module: TestingModule = await Test.createTestingModule({  
      controllers: [ExcelController],  
      providers: [  
        {  
          provide: ExcelService,  
          useValue: mockExcelService,  
        },  
      ],  
    }).compile();  
  
    controller = module.get<ExcelController>(ExcelController);  
    service = module.get<ExcelService>(ExcelService);  
  });  
  
  it('should be defined', () => {  
    expect(controller).toBeDefined();  
  });  
  
  describe('createExcel', () => {  
    it('should create an Excel file successfully', async () => {  
      const excelDto = {   
        name: 'Test Excel',   
        modelType: 'tipo1',   
        description: 'Test Description'   
      } as ExcelDto;  
        
      const mockFile = {} as Express.Multer.File;  
      const mockExcel = { id: 1, name: 'Test Excel' };  
        
      mockExcelService.createExcel.mockResolvedValue(mockExcel);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.createExcel(excelDto, mockFile, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(200);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        data: mockExcel,  
        message: 'Excel creado con exito'  
      });  
    });  
  
    it('should return error if Excel creation fails', async () => {  
      const excelDto = {   
        name: 'Test Excel',   
        modelType: 'tipo1',   
        description: 'Test Description'   
      } as ExcelDto;  
        
      const mockFile = {} as Express.Multer.File;  
        
      mockExcelService.createExcel.mockResolvedValue(null);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.createExcel(excelDto, mockFile, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(400);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'No se pudo crear el Excel'  
      });  
    });  
  });  
  
  describe('GetExcelById', () => {  
    it('should return Excel by id', async () => {  
      const mockExcel = { id: 1, name: 'Test Excel' };  
      mockExcelService.getExcelbyId.mockResolvedValue(mockExcel);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.GetExcelById(1, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(200);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        data: mockExcel,  
        message: 'Excel encontrado'  
      });  
    });  
  
    it('should return error if Excel not found', async () => {  
      mockExcelService.getExcelbyId.mockResolvedValue(null);  
        
      const mockResponse = {  
        status: jest.fn().mockReturnThis(),  
        json: jest.fn(),  
      } as unknown as Response;  
  
      await controller.GetExcelById(999, mockResponse);  
        
      expect(mockResponse.status).toHaveBeenCalledWith(404);  
      expect(mockResponse.json).toHaveBeenCalledWith({  
        message: 'No se encontro el Excel con ese id'  
      });  
    });  
  });  
});