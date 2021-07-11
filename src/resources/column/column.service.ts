import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepository: Repository<Column>,
  ) {}

  async find(boardId): Promise<Column[]> {
    return this.columnRepository.find({
      where: { boardId },
    });
  }

  async create(data): Promise<Column | Column[]> {
    return this.columnRepository.save(data);
  }
}