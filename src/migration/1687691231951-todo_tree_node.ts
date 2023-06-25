import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class todoTreeNode1687691231951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'nsleft',
        type: 'int4',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'nsright',
        type: 'int4',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('todo', 'nsleft');
    await queryRunner.dropColumn('todo', 'nsright');
  }
}
