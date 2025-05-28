import { NestFactory } from '@nestjs/core';
import { AuditLogModule } from './audit-log.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuditLogModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8081,
      }
    }
  );
  await app.listen();
}
bootstrap();
