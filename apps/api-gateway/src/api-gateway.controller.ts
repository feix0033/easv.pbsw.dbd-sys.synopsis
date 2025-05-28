// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'; // RxJS 的 Observable
import { ApiGatewayService } from './api-gateway.service';
import {
  CreateMongoAuditLogsDto,
  QueryMongoAuditLogsDto,
} from 'dtos/audit-logs.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy, // 注入微服务客户端
    @Inject('AUDIT_LOG') private readonly auditLogClient: ClientProxy,
  ) {}

  @Post('users')
  createUser(
    @Body() userData: { name: string; email: string },
  ): Observable<any> {
    // 使用 client.emit() 发送事件（无需等待响应）
    return this.userClient.emit('create_user', userData);
  }

  @Get('users/:id')
  getUser(@Param('id') id: string): Observable<any> {
    console.log('gateway message', id);

    // 使用 client.send() 发送请求-响应消息
    return this.userClient.send('get_user', { userId: parseInt(id, 10) });
  }

  @Post('audit-log/add/mongo')
  addMongoAuditLog(@Body() body: CreateMongoAuditLogsDto): Observable<any> {
    return this.auditLogClient.emit('add_mongo_audit_log', body);
  }

  @Get('audit-log/get/mongo')
  getMongoAuditLog(@Query() query: QueryMongoAuditLogsDto) {
    return this.auditLogClient.send('get_mongo_audit_log', query);
  }
}
