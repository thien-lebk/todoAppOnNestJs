import { Phase } from 'src/phase/entity/phase.entity';
import { User } from '../../auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('nested-set')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uuid: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column()
  description: string;

  @Column()
  estimatedTime: number;

  @CreateDateColumn({ type: 'timestamp' })
  dueDate: Date;

  @Column()
  priority: string;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.todo, { eager: false })
  user: User;

  @ManyToOne((type) => Phase, (phase) => phase.todos, { eager: false })
  phase: Phase;

  @TreeChildren()
  children: Todo[];

  @TreeParent()
  parent: Todo;
}
