import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import {
  CreateMongoAuditLogsDto,
  CreatePostgresAuditLogsDto,
  QueryMongoAuditLogsDto,
  QueryPostgresAuditLogsDto,
} from 'dtos/audit-logs.dto';
import { AuditLogsProstgresService } from './services/audit-logs.postgres.service';
import { AuditLogsMongoService } from './services/audit-logs.mongo.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuditLogsController {
  constructor(
    private readonly logsMongoService: AuditLogsMongoService,
    private readonly logsPostgresService: AuditLogsProstgresService,
  ) {}

  @MessagePattern('add_mongo_audit_log')
  async createMongo(@Payload() data: CreateMongoAuditLogsDto) {
    await this.logsMongoService.create(data);
    return { status: 'User created successfully' };
  }

  @MessagePattern('get_mongo_audit_log')
  async findMongo(@Payload() query: QueryMongoAuditLogsDto) {
    console.log(query);
    const res = await this.logsMongoService.findByQuery(query);
    console.log(res);
    return res;
  }

  @Post('postgres')
  async createPostgres(@Body() body: CreatePostgresAuditLogsDto) {
    return await this.logsPostgresService.create(body);
  }

  @Get('postgres/by-query')
  async findPostgres(@Query() query: QueryPostgresAuditLogsDto) {
    return await this.logsPostgresService.findByQuery(query);
  }

  @Get('/hello')
  getHello(){
    console.log('fetch request');
    
    return 'hello audit-log'
  }
}
