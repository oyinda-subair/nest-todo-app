import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  /**
   *
   * @param body
   * @returns Todo
   */
  // Creates a new todo
  public createTodo(body: CreateTodoDTO): Promise<Todo> {
    const todo: Todo = new Todo();
    todo.title = body.title;
    todo.description = body.description;
    todo.isDone = body.isDone;
    return this.repository.save(todo);
  }

  /**
   *
   * @param todoID
   * @returns Todo
   */
  // Returns a single todo with ID
  public findOne(todoID: number): Promise<Todo> {
    return this.repository.findOne({ where: { id: todoID } });
  }

  /**
   *
   * @returns Todos[]
   */
  // Returns all todos available
  public findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  // Deletes a todo by ID and add a new one (Update process)
  async update(id: number, todo: UpdateTodoDTO): Promise<Todo> {
    await this.repository.update(id, todo);

    return this.repository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
