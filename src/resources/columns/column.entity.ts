import {
  Column as TypeormColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Board from '../boards/board.entity';

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
}

export default Column;
