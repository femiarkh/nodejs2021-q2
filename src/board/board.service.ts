import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/models/task.entity';
import { Repository } from 'typeorm';
import { Board } from './models/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async all(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['columns'] });
  }

  async create(data): Promise<Board> {
    return this.boardRepository.save(data);
  }

  async findOne(condition): Promise<Board> {
    const board = await this.boardRepository.findOne(condition, {
      relations: ['columns'],
    });
    if (!board) {
      throw new NotFoundException('Board is not found');
    }
    return board;
  }

  async update(id: string, data): Promise<any> {
    return this.boardRepository.update(id, { title: data.title });
  }

  async delete(id: string): Promise<any> {
    return this.boardRepository.delete(id);
  }
}
