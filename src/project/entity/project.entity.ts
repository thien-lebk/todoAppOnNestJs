import { User } from 'src/auth/entity/user.entity';
import { Phase } from 'src/phase/entity/phase.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  uuid: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'float', nullable: true })
  budget: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @OneToMany(() => Phase, (phase) => phase.project)
  phase: Phase[];

  @ManyToMany(() => User, (user) => user.projects, {
    eager: true,
    // {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'},
  })
  @JoinTable({
    name: 'project_user',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
