/* eslint-disable import/no-cycle */
import {
  Column as TypeormColumn,
  Entity,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import Board from '../boards/board.entity';
// import Column from '../columns/column.entity';
// import User from '../users/user.entity';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id!: number;

  @TypeormColumn({ type: 'integer', name: 'board_id' })
  boardId!: number;

  @TypeormColumn({ type: 'integer', name: 'column_id' })
  columnId!: number;

  @TypeormColumn({ type: 'integer', name: 'user_id' })
  userId!: number | null;

  @TypeormColumn({ type: 'varchar' })
  title!: string;

  @TypeormColumn({ type: 'varchar' })
  description!: string;

  @TypeormColumn({ type: 'integer', name: 'task_order' })
  order!: number;

  // @ManyToOne(() => Board, (board) => board.tasks)
  // board?: Board;

  // @ManyToOne(() => Column, (column) => column.tasks)
  // column?: Column;

  // @ManyToOne(() => User, (user) => user.tasks)
  // user?: User;
}

export default Task;
