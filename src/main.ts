import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  });

  // Configuración de Swagger
  const options = new DocumentBuilder()
    .setTitle('API de Ejemplo')
    .setDescription('La API para gestionar los estudiantes')
    .setVersion('1.0')
    .addTag('students')  // Esto es solo para agrupar los endpoints
    .build();

  // Crear el documento Swagger
  const document = SwaggerModule.createDocument(app, options);

  // Configurar Swagger UI en la ruta '/api'
  SwaggerModule.setup('api', app, document);

  // Iniciar el servidor en el puerto configurado o el 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
