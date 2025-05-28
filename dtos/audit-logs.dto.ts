import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMongoAuditLogsDto {
  readonly userId: string;
  readonly action: string;
  readonly deviceId: string;
  readonly metadata: Record<string, any>;
}

export class CreatePostgresAuditLogsDto {
  readonly userId: string;
  readonly data: string;
}

export class QueryMongoAuditLogsDto {
  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  action?: string;

  @ApiPropertyOptional()
  deviceId?: string;

  @ApiPropertyOptional()
  metadata?: Record<string, any>;
}

export class QueryPostgresAuditLogsDto {
  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  action?: string;

  @ApiPropertyOptional()
  deviceId?: string;

  @ApiPropertyOptional()
  metadata?: Record<string, any>;
}
