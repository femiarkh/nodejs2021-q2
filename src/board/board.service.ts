import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BoardCreateDto } from './models/board-create.dto';
import { BoardUpdateDto } from './models/board-update.dto';
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

  async create(data: BoardCreateDto): Promise<Board> {
    return this.boardRepository.save(data);
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) {
      throw new NotFoundException('Board is not found');
    }
    return board;
  }

  async update(id: string, data: BoardUpdateDto): Promise<UpdateResult> {
    return this.boardRepository.update(id, { title: data.title });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.boardRepository.delete(id);
  }
}
