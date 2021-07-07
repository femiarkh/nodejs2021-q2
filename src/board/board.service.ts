import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return this.boardRepository.findOne(condition, { relations: ['columns'] });
  }

  async update(id: number, data): Promise<any> {
    return this.boardRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.boardRepository.delete(id);
  }
}
