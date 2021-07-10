import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TaskModule } from './task/task.module';
import 'dotenv/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerMiddleware } from './logger.middleware';
import { UserController } from './user/user.controller';
import { BoardController } from './board/board.controller';
import { TaskController } from './task/task.controller';
import { AuthController } from './auth/auth.controller';

const { colorize, errors, prettyPrint, simple, combine } = winston.format;
const { File, Console } = winston.transports;

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
    WinstonModule.forRoot({
      level: 'info',
      format: combine(colorize(), errors({ stack: true }), prettyPrint()),
      defaultMeta: { service: 'user-service' },
      transports: [
        new File({ filename: 'error.log', level: 'error' }),
        new File({ filename: 'combined.log' }),
        new Console({
          format: simple(),
        }),
      ],
    }),
    AuthModule,
    BoardModule,
    ColumnModule,
    TaskModule,
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
