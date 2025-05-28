import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMongoLogsDto {
  readonly userId: string;
  readonly action: string;
  readonly deviceId: string;
  readonly metadata: Record<string, any>;
}

export class CreatePostgresLogsDto {
  readonly userId: string;
  readonly data: string;
}

export class QueryMongoLogsDto {
  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  action?: string;

  @ApiPropertyOptional()
  deviceId?: string;

  @ApiPropertyOptional()
  metadata?: Record<string, any>;
}

export class QueryPostgresLogsDto {
  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  action?: string;

  @ApiPropertyOptional()
  deviceId?: string;

  @ApiPropertyOptional()
  metadata?: Record<string, any>;
}
