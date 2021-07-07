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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskCreateDto } from './models/task-create.dto';
import { TaskUpdateDto } from './models/task-update.dto';
import { Task } from './models/task.entity';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async all(@Param('boardId') boardId: string): Promise<Task[]> {
    return this.taskService.all(boardId);
  }

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() body: TaskCreateDto,
  ): Promise<Task> {
    return this.taskService.save(boardId, body);
  }

  @Get(':id')
  async get(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.taskService.findOne(boardId, id);
  }

  @Put(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() body: TaskUpdateDto,
  ) {
    await this.taskService.update(boardId, id, body);
    return this.taskService.findOne(boardId, id);
  }

  @Delete(':id')
  async delete(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.taskService.delete(boardId, id);
  }
}
