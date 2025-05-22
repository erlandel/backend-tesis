import { Test, TestingModule } from '@nestjs/testing';  
import { INestApplication, ValidationPipe } from '@nestjs/common';  
import * as request from 'supertest';  
import { AppModule } from 'src/app.module';  
  
describe('API Security Tests', () => {  
  let app: INestApplication;  
  
  beforeAll(async () => {  
    const moduleFixture: TestingModule = await Test.createTestingModule({  
      imports: [AppModule],  
    }).compile();  
  
    app = moduleFixture.createNestApplication();  
    app.useGlobalPipes(new ValidationPipe({ transform: true }));  
    await app.init();  
  });  
  
  describe('Input Validation', () => {  
    it('should reject invalid student data', () => {  
      return request(app.getHttpServer())  
        .post('/students')  
        .send({  
          // CI inválido (muy corto)  
          ciStudent: '123',  
          firstName: 'Test',  
          lastName: 'Student'  
        })  
        .expect(400); // Bad Request debido a validación fallida  
    });  
  
    it('should reject SQL injection attempts', () => {  
      return request(app.getHttpServer())  
        .get('/students/1\' OR \'1\'=\'1')  
        .expect(404); // Debería rechazar intentos de inyección SQL  
    });  
  });  
  
  describe('Error Handling', () => {  
    it('should handle errors gracefully', () => {  
      return request(app.getHttpServer())  
        .get('/students/nonexistent')  
        .expect(404)  
        .expect(res => {  
          // Verificar que no se exponen detalles de implementación en el error  
          expect(res.body).not.toHaveProperty('stack');  
          expect(res.body).toHaveProperty('message');  
        });  
    });  
  });  
  
  describe('File Upload Security', () => {  
    it('should reject invalid file types', () => {  
      return request(app.getHttpServer())  
        .post('/Excel/createExcel')  
        .field('name', 'Test Excel')  
        .field('modelType', 'tipo1')  
        .field('description', 'Test Description')  
        .attach('file', Buffer.from('<?php echo "malicious code"; ?>'), 'malicious.php')  
        .expect(400); // Debería rechazar archivos que no son Excel  
    });  
  });  
  
  afterAll(async () => {  
    await app.close();  
  });  
});