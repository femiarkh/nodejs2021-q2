/* eslint-disable import/no-cycle */
import {
  Column as TypeormColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Board from '../boards/board.entity';
// import Task from '../tasks/task.entity';

@Entity('columns')
class Column {
  @PrimaryGeneratedColumn({ name: 'column_id' })
  id!: number;

  @TypeormColumn({ type: 'integer', name: 'board_id' })
  board_id!: number;

  @TypeormColumn({ type: 'varchar' })
  title!: string;

  @TypeormColumn({ type: 'integer', name: 'column_order' })
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn({ name: 'board_id' })
  board?: Board;

  // @OneToMany(() => Task, (task) => task.column)
  // tasks?: Task[];
}

export default Column;
