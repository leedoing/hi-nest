import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { spawn } from 'child_process';
import tracer from 'dd-trace';
import { request } from 'http';
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
    // this.logger.log(`insert_time: 1234`);
    const delayTime = Date.now() - 1000000;
    this.logger.log({ delayTime: `${delayTime}` });
    return this.Todos;
  }

  getOne(id: number): Todo {
    const Todo = this.Todos.find((Todo) => Todo.id === id);
    if (!Todo) {
      this.logger.error(`Todo with ID ${id} not found.`);
      // throw new NotFoundException(`Todo with ID ${id} not found.`);

      const span = tracer.scope().active();
      try {
        var a = 3;
        var b = 0;
        if (b === 0) {
          // throw {
          //   name: 'UserIdCheckException',
          //   type: 'Error',
          //   msg: `${id} 유저 인증 에러 발생`,
          //   stack: `Error: at getOne() (${__filename.slice(
          //     __dirname.length + 1,
          //   )})`,
          // };
          throw Error('');
        }
      } catch (e) {
        // console.log(e);
        span.setTag('error.type', 'Error Search User');
        span.setTag('resouce.name', '/todos/:id');
        span.setTag('error.msg', `ID: ${id} 유저 검색 에러`);
        span.setTag('error', e);
      }
      // function getErrorObject() {
      //   try {
      //     throw Error('');
      //   } catch (err) {
      //     return err;
      //   }
      // }

      // var err = getErrorObject();
      // var caller_line = err.stack.split('\n')[4];
      // var index = caller_line.indexOf('at ');
      // var clean = caller_line.slice(index + 2, caller_line.length);
      // console.log(err);

      // async function getUser() {
      //   try {
      //     const response = await axios.get('https://hello.exception');
      //     console.log(response);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // getUser();

      throw new HttpException(
        {
          message: 'ServerError',
          msg: '시발',
          error: 'error',
          status: 503,
        },
        503,
      );

      // console.log(span);
      // return;
    } else {
      return Todo;
    }
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
    this.deleteOne(id);
    this.Todos.push({ ...Todo, ...updateData });
  }
}
