import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import {
  CreateMongoLogsDto,
  CreatePostgresLogsDto,
  QueryMongoLogsDto,
  QueryPostgresLogsDto,
} from './dto/logs.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogsProstgresService } from './services/logs.postgres.service';
import { LogsMongoService } from './services/logs.mongo.service';

@ApiTags('Audit Logs')
@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsMongoService: LogsMongoService,
    private readonly logsPostgresService: LogsProstgresService,
  ) {}

  @Post('/mongo')
  async createMongo(@Body() body: CreateMongoLogsDto) {
    console.log('mongo');

    return await this.logsMongoService.create(body);
  }

  @Get('/mongo/by-query')
  async findMongo(@Query() query: QueryMongoLogsDto) {
    console.log(query);
    const res = await this.logsMongoService.findByQuery(query);
    console.log(res);
    return res;
  }

  @Post('postgres')
  async createPostgres(@Body() body: CreatePostgresLogsDto) {
    return await this.logsPostgresService.create(body);
  }

  @Get('postgres/by-query')
  async findPostgres(@Query() query: QueryPostgresLogsDto) {
    return await this.logsPostgresService.findByQuery(query);
  }
}
