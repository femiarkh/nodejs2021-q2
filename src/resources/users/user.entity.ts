import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import Task from '../tasks/task.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  login!: string;

  @Column({ type: 'varchar' })
  password!: string;

  // @OneToMany(() => Task, (task) => task.column)
  // tasks?: Task[];
}

export default User;
