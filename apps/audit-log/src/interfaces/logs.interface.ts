import {
  CreateMongoLogsDto,
  CreatePostgresLogsDto,
  QueryMongoLogsDto,
  QueryPostgresLogsDto,
} from '../dto/logs.dto';

export interface ILogsService {
  findAll(): Promise<any[]>;
  findByQuery(
    query: any,
  ): Promise<QueryMongoLogsDto | QueryPostgresLogsDto | null>;
  create(
    data: any,
  ): Promise<any>;
}
