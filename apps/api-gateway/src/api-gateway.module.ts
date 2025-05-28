import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE', // 客户端名称，用于注入
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8080, // 连接到用户服务的端口
        },
      },
      {
        name: 'AUDIT_LOG',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8081,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
