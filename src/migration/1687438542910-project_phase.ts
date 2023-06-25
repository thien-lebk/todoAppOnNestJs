import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class project_phase1687438542910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'budget',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
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
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'phase',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
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
            name: 'project_phase_id',
            type: 'int4',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    const table = await queryRunner.getTable('phase');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('project_phase_id') !== -1,
    );
    !foreignKey &&
      (await queryRunner.createForeignKey(
        'phase',
        new TableForeignKey({
          name: 'fk_phase',
          columnNames: ['project_phase_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'project',
          onDelete: 'CASCADE',
        }),
      ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('phase');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('project_phase_id') !== -1,
    );
    foreignKey && (await queryRunner.dropForeignKey('phase', foreignKey));
    await queryRunner.dropTable('project', true);
    await queryRunner.dropTable('phase', true);
  }
}
