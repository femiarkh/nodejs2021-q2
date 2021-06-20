import {
  Column as TypeormColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}

export default Task;
