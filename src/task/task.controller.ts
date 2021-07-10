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
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { TaskCreateDto } from './models/task-create.dto';
import { TaskUpdateDto } from './models/task-update.dto';
import { Task } from './models/task.entity';

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
  async get(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.findOne(boardId, id);
  }

  @Put(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() body: TaskUpdateDto,
  ): Promise<Task> {
    await this.taskService.update(boardId, id, body);
    return this.taskService.findOne(boardId, id);
  }

  @Delete(':id')
  async delete(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    return this.taskService.delete(boardId, id);
  }
}
