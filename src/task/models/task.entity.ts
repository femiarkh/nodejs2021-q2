import { Board } from 'src/board/models/board.entity';
import { Column } from 'src/column/column.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column as TypeormColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @TypeormColumn()
  title: string;

  @TypeormColumn()
  order: number;

  @TypeormColumn()
  description: string;

  @ManyToOne(() => User)
  user: User;

  @TypeormColumn()
  userId: string;

  @ManyToOne(() => Board)
  board: Board;

  @TypeormColumn()
  boardId: string;

  @ManyToOne(() => Column)
  column: Column;

  @TypeormColumn()
  columnId: string;
}
