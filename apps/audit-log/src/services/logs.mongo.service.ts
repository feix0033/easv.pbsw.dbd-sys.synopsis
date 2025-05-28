import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CacheLogger } from 'util/cache-logger';
import { Logs, LogsSchema } from '../schemas/logs.schema';
import { ILogsService } from '../interfaces/logs.interface';
import { Cache } from 'cache-manager';

const cacheLogger = new CacheLogger();

@Injectable()
export class LogsMongoService implements ILogsService {
  constructor(
    // DI mongoDB model
    @InjectModel(Logs.name) private logsModel: Model<Logs>,
    // DI cache manager: redis
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    return await this.logsModel.find().sort({ createdAt: -1 }).limit(100);
  }

  async findByQuery(query: any) {
    const key = JSON.stringify(query);

    const cached = await this.cacheManager.get(key);
    if (cached) {
      cacheLogger.hit();
      return cached;
    }

    cacheLogger.miss();

    const result = await this.logsModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(100);
    await this.cacheManager.set(key, result, 60000); // 缓存 60 秒
    return result;
  }

  async create(data: any) {
    console.time(`Create ${data.userId}`);
    const result = await new this.logsModel(data).save();
    console.timeEnd(`Create ${data.userId}`);
    return result;
  }
}
