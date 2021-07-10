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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeormColumn()
  title: string;

  @TypeormColumn()
  order: number;

  @TypeormColumn()
  description: string;

  @TypeormColumn({ nullable: true })
  userId: string | null;

  @TypeormColumn({ nullable: true })
  boardId: string | null;

  @TypeormColumn({ nullable: true })
  columnId: string | null;
}
