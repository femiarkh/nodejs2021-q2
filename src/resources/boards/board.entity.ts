import {
  Column as TypeormColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Column from '../columns/column.entity';
// eslint-disable-next-line import/no-cycle
// import Task from '../tasks/task.entity';

@Entity('boards')
class Board {
  @PrimaryGeneratedColumn({ name: 'board_id' })
  id!: number;

  @TypeormColumn({ type: 'varchar' })
  title!: string;

  @OneToMany(() => Column, (column) => column.board)
  columns?: Column[];

  // @OneToMany(() => Task, (task) => task.board)
  // tasks?: Task[];
}

export default Board;
