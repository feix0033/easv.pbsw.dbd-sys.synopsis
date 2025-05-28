import {
  CreateMongoAuditLogsDto,
  CreatePostgresAuditLogsDto,
  QueryMongoAuditLogsDto,
  QueryPostgresAuditLogsDto,
} from '../../../../dtos/audit-logs.dto';

export interface IAuditLogsService {
  findAll(): Promise<any[]>;
  findByQuery(
    query: any,
  ): Promise<QueryMongoAuditLogsDto | QueryPostgresAuditLogsDto | null>;
  create(
    data: any,
  ): Promise<any>;
}
