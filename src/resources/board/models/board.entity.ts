import { Column } from 'src/resources/column/column.entity';
import {
  Column as TypeormColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeormColumn()
  title: string;

  @OneToMany(() => Column, (column) => column.boardId)
  columns: Column[];
}