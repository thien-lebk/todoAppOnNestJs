import { User } from '../../auth/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoPayload } from '../interface/todo-payload.interface';
import { Phase } from 'src/phase/entity/phase.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(todoDto: TodoDto): Promise<Todo> {
    try {
      const {
        title,
        description,
        estimatedTime,
        dueDate,
        priority,
        status,
        user,
        phase,
        uuid,
        parent,
      } = todoDto;
      const phaseFind = await Phase.findOne({ where: { uuid: phase.uuid } });
      if (!phaseFind) throw new BadRequestException('Phase not found !');
      const todo = new Todo();

      todo.title = title;
      todo.description = description;
      todo.estimatedTime = estimatedTime;
      todo.dueDate = dueDate;
      todo.priority = priority;
      todo.status = status;
      todo.uuid = uuid;
      if (user?.uuid) {
        const userFind = await User.findOne({ where: { uuid: user.uuid } });
        todo.user = userFind;
      }
      if (parent?.uuid) {
        const parentFind = await Todo.findOne({ where: { uuid: parent.uuid } });
        todo.parent = parentFind;
      }
      todo.phase = phaseFind;
      await todo.save();
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async getAllTodo(user: User): Promise<TodoPayload[]> {
    const query = this.createQueryBuilder('todo');

    query.where('todo.userId = :userId', { userId: user.id });

    const todos = await query.getMany();
    return todos;
  }
}
