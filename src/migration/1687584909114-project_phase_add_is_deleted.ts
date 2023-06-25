import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class project1687584909114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'project',
      new TableColumn({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
      }),
    );
    await queryRunner.addColumn(
      'phase',
      new TableColumn({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // project
    const projecthasColumnIsDeleted = await queryRunner.hasColumn(
      'project',
      'is_deleted',
    );
    projecthasColumnIsDeleted &&
      (await queryRunner.dropColumn('project', 'is_deleted'));
    // phase
    const phasethasColumnIsDeleted = await queryRunner.hasColumn(
      'phase',
      'is_deleted',
    );
    phasethasColumnIsDeleted &&
      (await queryRunner.dropColumn('phase', 'is_deleted'));
  }
}
