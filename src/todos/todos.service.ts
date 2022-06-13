import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todos.entity';

@Injectable()
export class TodosService {
  private Todos: Todo[] = [];
  logger: Logger;

  constructor() {
    this.logger = new Logger(TodosService.name);
  }

  getAll(): Todo[] {
    return this.Todos;
  }

  getOne(id: number): Todo {
    const Todo = this.Todos.find((Todo) => Todo.id === id);
    if (!Todo) {
      this.logger.error(`Todo with ID ${id} not found.`);
      throw new NotFoundException(`Todo with ID ${id} not found.`);
    }
    return Todo;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.Todos = this.Todos.filter((Todo) => Todo.id !== id);
  }

  create(TodoData: CreateTodoDto) {
    this.Todos.push({
      id: this.Todos.length + 1,
      ...TodoData,
    });
    this.logger.log(`Create Todo ID: ${TodoData.name}`);
  }

  update(id: number, updateData: UpdateTodoDto) {
    const Todo = this.getOne(id);
    const TodoList = Todo.todoList;
    console.log(Todo);
    console.log(TodoList);
    this.deleteOne(id);
    this.Todos.push({ ...Todo, ...updateData });
  }
}
