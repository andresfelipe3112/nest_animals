import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .addTag('Animals')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}