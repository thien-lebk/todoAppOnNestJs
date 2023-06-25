import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class todoPhaseUser1687684007558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'due_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'estimated_time',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: true,
          },
          {
            name: 'phase_id',
            type: 'int4',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'todo',
      new TableForeignKey({
        name: 'fk_todo_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      }),
    );
    await queryRunner.createForeignKey(
      'todo',
      new TableForeignKey({
        name: 'fk_todo_phase',
        columnNames: ['phase_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'phase',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('todo', 'fk_todo_user');
    await queryRunner.dropColumn('todo', 'user_di');
    await queryRunner.dropForeignKey('todo', 'fk_todo_phase');
    await queryRunner.dropColumn('todo', 'phase_id');
  }
}
