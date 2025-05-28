// src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1', // 微服务监听的地址
        port: 3001, // 微服务监听的端口
      },
    },
  );
  await app.listen();
  console.log('User Microservice is listening on port 3001');
}
bootstrap();
