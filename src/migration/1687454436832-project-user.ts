import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class projectUser1687454436832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_user',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'project_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: false,
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
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'project_user',
      new TableForeignKey({
        name: 'fk_project',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'project_user',
      new TableForeignKey({
        name: 'fk_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('project_user');
    if (table) {
      const fkProjectUserProject = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('project_user_project') !== -1,
      );
      fkProjectUserProject &&
        (await queryRunner.dropForeignKey(
          'project_user',
          fkProjectUserProject,
        ));

      const fkProjectUserUser = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('project_user_project') !== -1,
      );
      fkProjectUserUser &&
        (await queryRunner.dropForeignKey('project_user', fkProjectUserUser));
    }

    await queryRunner.dropTable('project_user');
  }
}
