import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardService } from './board.service';
import { BoardCreateDto } from './models/board-create.dto';
import { BoardUpdateDto } from './models/board-update.dto';
import { Board } from './models/board.entity';
import { ColumnService } from './../column/column.service';
import { TaskService } from 'src/task/task.service';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
  ) {}

  @Get()
  async all(): Promise<Board[]> {
    return this.boardService.all();
  }

  @Post()
  async create(@Body() body: BoardCreateDto): Promise<Board> {
    const { id } = await this.boardService.create(body);
    await this.columnService.create(
      body.columns.map((column) => {
        column.boardId = id;
        return column;
      }),
    );
    return this.boardService.findOne(id);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Board> {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: BoardUpdateDto,
  ): Promise<Board> {
    await this.boardService.update(id, body);
    await this.columnService.create(
      body.columns.map((column) => {
        column.boardId = id;
        return column;
      }),
    );

    return this.boardService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    const tasks = await this.taskService.all(id);
    await Promise.all(
      tasks.map((task) => this.taskService.delete(id, task.id)),
    );
    return this.boardService.delete(id);
  }
}
