import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskCreateDto } from './models/task-create.dto';
import { TaskUpdateDto } from './models/task-update.dto';
import { Task } from './models/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async all(boardId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { boardId },
    });
  }

  async findByCondition(condition: {
    [key: string]: string | number;
  }): Promise<Task[]> {
    return this.taskRepository.find({
      where: condition,
    });
  }

  async save(boardId: string, task: TaskCreateDto): Promise<Task> {
    return this.taskRepository.save({ ...task, boardId });
  }

  async findOne(boardId: string, id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        boardId,
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task is not found');
    }
    return task;
  }

  async update(
    boardId: string,
    id: string,
    data: TaskUpdateDto,
  ): Promise<UpdateResult> {
    const task = await this.taskRepository.findOne({
      where: {
        boardId,
        id,
      },
    });
    if (!task) {
      throw new BadRequestException('There is no such task on this board');
    }
    return this.taskRepository.update(id, data);
  }

  async delete(boardId: string, id: string): Promise<DeleteResult> {
    const task = await this.taskRepository.findOne({
      where: {
        boardId,
        id,
      },
    });
    if (!task) {
      throw new BadRequestException('There is no such task on this board');
    }
    return this.taskRepository.delete(id);
  }
}
