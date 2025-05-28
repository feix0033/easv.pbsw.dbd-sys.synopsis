import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheLogger } from '../../../util/cache-logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILogsService } from '../interfaces/logs.interface';
import { CreatePostgresLogsDto } from '../dto/logs.dto';
import { Builder } from 'xml2js';
import { LogsEntity } from '../entities/logs.entity';

const cacheLogger = new CacheLogger();

@Injectable()
export class LogsProstgresService implements ILogsService {
  constructor(
    // DI postgreSQL repository
    @InjectRepository(LogsEntity)
    private logsRepository: Repository<LogsEntity>,
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

  async create(data: CreatePostgresLogsDto): Promise<LogsEntity> {
    console.time(`Create ${data}`);
    const builder = new Builder();
    const xmlData = builder.buildObject(data || {});
    const logs = new LogsEntity();
    logs.data = xmlData;

    const result = await this.logsRepository.save(logs);
    console.timeEnd(`Create ${data}`);
    return result;
  }
}
