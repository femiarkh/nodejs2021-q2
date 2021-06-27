import { MigrationInterface, QueryRunner } from 'typeorm';

export class tasks1624197348400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS tasks;

        CREATE TABLE tasks (
          task_id SERIAL,
          board_id INT,
          column_id INT,
          user_id INT,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          task_order INT,
          CONSTRAINT pk_tasks_id PRIMARY KEY (task_id)
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
