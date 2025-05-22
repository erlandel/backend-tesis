import { Test, TestingModule } from '@nestjs/testing';  
import { INestApplication } from '@nestjs/common';  
import * as request from 'supertest';  
import { AppModule } from '../src/app.module';  
  
describe('AppController (e2e)', () => {  
  let app: INestApplication;  
  
  beforeEach(async () => {  
    const moduleFixture: TestingModule = await Test.createTestingModule({  
      imports: [AppModule],  
    }).compile();  
  
    app = moduleFixture.createNestApplication();  
    await app.init();  
  });  
  
  it('/students (GET)', () => {  
    return request(app.getHttpServer())  
      .get('/students')  
      .expect(200);  
  });  
  
  it('/Excel/getAllExcel (GET)', () => {  
    return request(app.getHttpServer())  
      .get('/Excel/getAllExcel')  
      .expect(200);  
  });  
  
  afterAll(async () => {  
    await app.close();  
  });  
});