import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogController } from './audit-log.controller';
import { AuditLogService } from './audit-log.service';

describe('AuditLogController', () => {
  let auditLogController: AuditLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuditLogController],
      providers: [AuditLogService],
    }).compile();

    auditLogController = app.get<AuditLogController>(AuditLogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(auditLogController.getHello()).toBe('Hello World!');
    });
  });
});
