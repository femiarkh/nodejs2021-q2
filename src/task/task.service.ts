import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './models/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async all(boardId): Promise<Task[]> {
    return this.taskRepository.find({
      where: { boardId },
    });
  }

  async findByCondition(condition): Promise<Task[]> {
    return this.taskRepository.find({
      where: condition,
    });
  }

  async save(boardId, task): Promise<Task> {
    return this.taskRepository.save({ ...task, boardId });
  }

  async findOne(boardId, id): Promise<Task> {
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

  async update(boardId, id, data): Promise<any> {
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

  async delete(boardId, id): Promise<any> {
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
