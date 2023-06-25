import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class phaseAddBudgetColumn1687625336780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'phase',
      new TableColumn({
        name: 'budget',
        type: 'float',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('phase', 'budget');
  }
}
