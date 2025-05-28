import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheLogger } from '../cache/cache-logger'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuditLogsService } from '../interfaces/audit-logs.interface';
import { CreatePostgresAuditLogsDto } from '../../../../dtos/audit-logs.dto';
import { Builder } from 'xml2js';
import { AuditLogsEntity } from '../entities/audit-logs.entity';

const cacheLogger = new CacheLogger();

@Injectable()
export class AuditLogsProstgresService implements IAuditLogsService {
  constructor(
    // DI postgreSQL repository
    @InjectRepository(AuditLogsEntity)
    private logsRepository: Repository<AuditLogsEntity>,
    // DI cache manager: redis
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    return await this.logsRepository.find();
  }

  async findByQuery(query: any) {
    const key = JSON.stringify(query);

    const cached = await this.cacheManager.get(key);
    if (cached) {
      cacheLogger.hit();
      return cached;
    }

    cacheLogger.miss();

    const result = await this.logsRepository.find(query);
    await this.cacheManager.set(key, result, 60000);

    return result;
  }

  async create(data: CreatePostgresAuditLogsDto): Promise<AuditLogsEntity> {
    console.time(`Create ${data}`);
    const builder = new Builder();
    const xmlData = builder.buildObject(data || {});
    const logs = new AuditLogsEntity();
    logs.data = xmlData;

    const result = await this.logsRepository.save(logs);
    console.timeEnd(`Create ${data}`);
    return result;
  }
}
