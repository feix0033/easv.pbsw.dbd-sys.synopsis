import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'test_auditlogs',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // 生产环境建议关闭
        logging: true,
      }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/auditlogs'),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class DatabaseModule {}
