import {
  Column as TypeormColumn,
  Entity,
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
