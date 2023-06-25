import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Todo } from '../../todo/entity/todo.entity';
import { UserInfo } from '../../user/entity/user-info.entity';
import { Project } from 'src/project/entity/project.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Todo, (todo) => todo.user, { eager: false })
  todo: Todo[];

  @OneToOne(() => UserInfo, { eager: true })
  @JoinColumn()
  userInfo: UserInfo;

  @ManyToMany(() => Project, (project) => project.users, {
    eager: false,
  })
  projects: Project[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
