import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from './schemas/logs.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsEntity } from './entities/logs.entity';
import { LogsMongoService } from './services/logs.mongo.service';
import { LogsProstgresService } from './services/logs.postgres.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logs.name, schema: LogsSchema }]),
    TypeOrmModule.forFeature([LogsEntity]),
    CacheModule.register({
      store: redisStore,
      url: 'redis://localhost:6379', // 或 docker-compose 的 redis 服务名
      isGlobal: true,
    }),
  ],
  providers: [LogsMongoService, LogsProstgresService],
  controllers: [LogsController],
  exports: [LogsMongoService, LogsProstgresService],
})
export class LogsModule {}
