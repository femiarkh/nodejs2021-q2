import { MigrationInterface, QueryRunner } from 'typeorm';

export class columns1624178835473 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS columns;

        CREATE TABLE columns (
          column_id SERIAL,
          board_id SERIAL,
          title VARCHAR(255) NOT NULL,
          column_order INT,
          CONSTRAINT pk_columns_id PRIMARY KEY (column_id),
          CONSTRAINT fk_board
            FOREIGN KEY(board_id)
              REFERENCES boards(board_id)
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('columns');
  }
}
