import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './resources/board/board.module';
import { ColumnModule } from './resources/column/column.module';
import { TaskModule } from './resources/task/task.module';
import 'dotenv/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { LoggerMiddleware } from './logging/logger.middleware';
import { UserController } from './resources/user/user.controller';
import { BoardController } from './resources/board/board.controller';
import { TaskController } from './resources/task/task.controller';
import { AuthController } from './auth/auth.controller';
import { LoggerModule } from './logging/logger.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    BoardModule,
    ColumnModule,
    TaskModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UserController,
        BoardController,
        TaskController,
        AuthController,
      );
  }
}
