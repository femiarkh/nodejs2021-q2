import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1624118503716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
          user_id SERIAL,
          name VARCHAR(255) NOT NULL,
          login VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          CONSTRAINT pk_users_id PRIMARY KEY (user_id)
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
