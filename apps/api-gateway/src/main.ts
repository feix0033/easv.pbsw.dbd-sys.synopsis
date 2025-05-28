import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('My-project for synopsis')
    // .setDescription()
    // .addTag()
    .build();

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(process.env.port ?? 3000);
  console.log('Api gateway listening...');
}
bootstrap();
