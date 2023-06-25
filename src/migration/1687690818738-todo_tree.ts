import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class todoTree1687690818738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'parent_id',
        type: 'int4',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'left_id',
        type: 'int4',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'right_id',
        type: 'int4',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'todo',
      new TableForeignKey({
        name: 'fk_todo_parent',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'todo',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('todo', 'fk_todo_parent');
  }
}
