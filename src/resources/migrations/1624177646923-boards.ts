import { MigrationInterface, QueryRunner } from 'typeorm';

export class boards1624177646923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS boards;

        CREATE TABLE boards (
          board_id SERIAL,
          title VARCHAR(255) NOT NULL,
          CONSTRAINT pk_board_id PRIMARY KEY (board_id)
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('boards');
  }
}
