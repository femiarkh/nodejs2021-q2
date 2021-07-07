import { Column } from 'src/column/column.entity';
import {
  Column as TypeormColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @TypeormColumn()
  title: string;

  @OneToMany(() => Column, (column) => column.boardId)
  columns: Column[];
}
