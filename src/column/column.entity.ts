import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Board } from 'src/board/models/board.entity';

import {
  Column as TypeormColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @TypeormColumn()
  @IsNotEmpty()
  @IsString()
  title: string;

  @TypeormColumn()
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  boardId: number;
}
