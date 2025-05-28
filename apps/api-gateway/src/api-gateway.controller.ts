// src/app.controller.ts
import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'; // RxJS 的 Observable
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy, // 注入微服务客户端
    @Inject('AUDIT_LOG') private readonly auditLogClient: ClientProxy,
  ) {}

  @Get('users/:id')
  getUser(@Param('id') id: string): Observable<any> {
    console.log('gateway message', id);

    // 使用 client.send() 发送请求-响应消息
    return this.userClient.send('get_user', { userId: parseInt(id, 10) });
  }

  @Post('users')
  createUser(
    @Body() userData: { name: string; email: string },
  ): Observable<any> {
    // 使用 client.emit() 发送事件（无需等待响应）
    return this.userClient.emit('create_user', userData);
  }

  @Get('audit-log')
  getHello(): Observable<any>{
    return this.auditLogClient.send('get-hello', {})

  }
}
