import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './api/todo/todo.controller';
import { TodoService } from './api/todo/todo.service';
import { TodoModule } from './api/todo/todo.module';
import { getEnvPath } from './common/helper/env.helper';
import { validate } from './common/helper/env.validation';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TodoModule,
    ApiModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
