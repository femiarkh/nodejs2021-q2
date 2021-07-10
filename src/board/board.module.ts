import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnModule } from 'src/column/column.module';
import { TaskModule } from 'src/task/task.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './models/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), ColumnModule, TaskModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
