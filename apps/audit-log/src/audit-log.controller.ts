import { Controller, Get } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @MessagePattern('get-hello')
  getHello(): string {
    return this.auditLogService.getHello();
  }
}
