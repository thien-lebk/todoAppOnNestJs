import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entity/user.entity';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoPayload } from '../interface/todo-payload.interface';
import { TodoRepository } from '../repository/todo.repository';
import { uuid } from 'uuidv4';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  async getAllTodo(user: User): Promise<TodoPayload[]> {
    return this.todoRepository.getAllTodo(user);
  }

  async createTodo(todoDto: TodoDto): Promise<TodoPayload> {
    return this.todoRepository.createTodo({ ...todoDto, uuid: uuid() });
  }

  async getTodoById(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['phase', 'user'],
    });
    if (!todo) {
      throw new NotFoundException(`This ${id} is not found`);
    }
    return todo;
  }

  async updateTodoById(
    id: number,
    todoDto: TodoDto,
    user: User,
  ): Promise<TodoPayload> {
    const todo = await this.getTodoById(id, user);
    todo.title = todoDto.title;
    todo.description = todoDto.description;
    todo.estimatedTime = todoDto.estimatedTime;
    todo.dueDate = todoDto.dueDate;
    todo.priority = todoDto.priority;
    todo.status = todoDto.status;
    if (user?.uuid) {
      const userFind = await User.findOne({ where: { uuid: user.uuid } });
      todo.user = userFind;
    }
    if (todoDto?.parent?.uuid) {
      const parentFind = await Todo.findOne({
        where: { uuid: todoDto.parent.uuid },
      });
      todo.parent = parentFind;
    }
    await todo.save();
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  async deleteTodoById(id: number, user: User): Promise<{ message: string }> {
    const todo = await this.todoRepository.delete({ id });

    if (todo.affected === 0) {
      throw new NotFoundException(`This ${id} is not found`);
    }
    return { message: 'Deleted successfully !' };
  }
}
