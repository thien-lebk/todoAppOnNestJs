import { Project } from 'src/project/entity/project.entity';
import { Todo } from 'src/todo/entity/todo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Phase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  uuid: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'float', nullable: true })
  budget: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @ManyToOne(() => Project, (project) => project.phase)
  @JoinColumn({ name: 'project_phase_id' })
  project: Project;

  @ManyToOne(() => Todo, (todo) => todo.phase)
  @JoinColumn({ name: 'project_phase_id' })
  todos: Todo;
}
