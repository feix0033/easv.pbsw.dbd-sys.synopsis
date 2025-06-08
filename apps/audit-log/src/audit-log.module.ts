import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { AuditLogsController } from './audit-log.controller';
import { AuditLogs, AuditLogsSchema } from './schemas/audit-logs.schema';
import { AuditLogsEntity } from './entities/audit-logs.entity';
import { AuditLogsMongoService } from './services/audit-logs.mongo.service';
import { AuditLogsProstgresService } from './services/audit-logs.postgres.service';
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/logs',
    ),
    MongooseModule.forFeature([
      { name: AuditLogs.name, schema: AuditLogsSchema },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres', // 或 'mongodb'（如果你正在切 MongoDB，那就不该使用 TypeORM）
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: process.env.DATABASE_USERNAME || 'postgres', // Use environment variable
      password: process.env.DATABASE_PASSWORD || 'postgres', // Use environment variable
      database: process.env.DATABASE_NAME || 'audit_logs',
      entities: [AuditLogsEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AuditLogsEntity]),
    CacheModule.register({
      store: redisStore,
      url: 'redis://localhost:6379',
      isGlobal: true,
    }),
  ],
  controllers: [AuditLogsController],
  providers: [AuditLogsMongoService, AuditLogsProstgresService],
})
export class AuditLogModule {}
